// This module handles all rather general interactions; from registering users,
// logging them in and editing their profiles to restoring their passwords

var express         = require("express"),
    router          = express.Router(),
    passport        = require("passport"),
    User            = require("../models/user"),
    Beach           = require("../models/beach"),
    nodemailer      = require("nodemailer"),
    async           = require("async"),
    crypto          = require("crypto"),
    multer          = require('multer'),

    middleware      = require("../middleware"),
    isProfileOwner  = middleware.isProfileOwner,

    storage = multer.diskStorage({
        filename: function(req, file, callback) {
            callback(null, Date.now() + file.originalname);
        }
    }),

    imageFilter = function(req, file, cb) {
        // accept image files only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },

    upload = multer({ storage: storage, fileFilter: imageFilter }),

    cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'mviladrichhe',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// ROOT ROUTE - landing page
router.get("/", function(req, res) {
    // render our landing page
    res.render("landing");
});


// REGISTER - show form
router.get("/register", function(req, res) {
    res.render("register", { referer: req.headers.referer });
});


// REGISTER - Logic
router.post("/register", upload.single("picURL"), function(req, res) {
    cloudinary.uploader.upload(req.file.path, function(result) {
        // add cloudinary url for the image to the beach object under image property
        req.body.user.username = req.body.username;

        // push a new pic object with cloudinary url and id to user object
        req.body.user.pics = [{
            url: result.secure_url,
            id: result.public_id
        }];

        req.body.user.password = req.body.password;

        if (req.body.user.adminCode === "wannabeadmin") {
            req.body.user.isAdmin = true;
        }

        var newUser = req.body.user;
        User.register(newUser, req.body.user.password, function(err, user) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }

            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Welcome to Paralia, " + user.username + "!");
                res.redirect("back");
            });
        });
    });
});


// LOGIN - show form
router.get("/login", function(req, res) {
    // req.flash("success", "Welcome back, Robert!");
    res.render("login", { referer: req.headers.referer, message: req.flash("error") });
});


// LOGIN - logic
router.post("/login",
    passport.authenticate("local", {
        failureRedirect: "back",
        failureFlash: { type: "error", message: "Invalid username or password" }
    }),
    function(req, res) {
        req.flash("success", "Welcome back, " + req.user.username + "!");
        res.redirect("back");
    });


//LOGOUT - get
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("error", "Logged you out!");
    res.redirect(req.headers.referer);
});

// USER PROFILE PAGE
router.get("/users/:user_id", function(req, res) {
    User.findById(req.params.user_id, function(err, foundUser) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong!");
            res.redirect("back");
        }
        else {
            Beach.find().where("author.id").equals(foundUser._id).exec(function(err, postedBeaches) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Something went wrong when retrieving User's Beaches");
                    res.redirect("back");
                }
                else {
                    res.render("users/show", { user: foundUser, beaches: postedBeaches });
                }
            });

        }
    });

});

// USER EDIT PROFILE PAGE
router.get("/users/:user_id/edit", function(req, res) {
    User.findById(req.params.user_id, function(err, foundUser) {
        if (err) {
            console.log(err);
            req.flash("error", "something went wrong when retrieving user");
            res.redirect("back");
        }
        else {
            res.render("users/edit", { user: foundUser });
        }
    });
});

// UPDATE user profile using the data coming in from the form (scroll to bottom 
// for helper functions)
router.put("/users/:user_id", upload.array("pic"), function(req, res, next) {
    var addOrDeletePics = {
        findUser: function() {
            return User.findById(req.params.user_id).then(function(user) {
                return user;
            });
        },

        deletePics: function() {
            return this.findUser().then(function(user) {
                return deleteSelectedPics(req, res, user);
            });
        },

        addPics: function() {
            return this.deletePics().then(function(result) {
                return addSelectedPics(req, res, result.user, result.deletedAll);
            });
        },

        updateUser: function() {
            return this.addPics().then(function(user) {
                saveAndRedirect(req, res, user);
            });
        }
    };
    addOrDeletePics.updateUser();
});


// FORGOT PASSWORD ROUTES
router.get("/forgot", function(req, res) {
    res.render("forgot");
});

router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },

        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },

        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'dummy.mvh@gmail.com',
                    pass: process.env.GMAILPW
                }
            });

            var mailOptions = {
                to: user.email,
                from: 'dummy.mvh@gmail.com',
                subject: 'Paralia Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            smtpTransport.sendMail(mailOptions, function(err) {
                console.log('mail sent');
                req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) {
            console.log("there was an error after sending the mail...");
            return next(err);
        }

        res.redirect('/forgot');
    });
});

router.get("/reset/:token", function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            req.flash("error", "Reset code is invalid or has expired");
            return res.redirect("/forgot");
        }
        else {
            res.render("reset", { token: req.params.token });
        }
    })
});

router.post('/reset/:token', function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    user.setPassword(req.body.newPassword, function(err) {
                        if (err) {
                            console.log(err);
                            req.flash("error", "Some error occurred when setting new password");
                            res.redirect("/reset/" + req.params.token);
                        }
                        else {
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpires = undefined;

                            user.save(function(err) {
                                if (err) {
                                    console.log(err);
                                    req.flash("error", "Error when saving new password to database");
                                    res.redirect("/reset/" + req.params.token);
                                }
                                else {
                                    req.logIn(user, function(err) {
                                        done(err, user);
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    req.flash("error", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'learntocodeinfo@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'learntocodeinfo@mail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function(err) {
        res.redirect('/beaches');
    });
});

router.post("/reset/:token", function(req, res) {

})
// FORGOT PASSWORD ROUTES


// USER EDIT HELPER FUNCTIONS
function deleteSelectedPics(req, res, user) {
    var deletedPicsArr, deletePics;
    // only try to delete pics if the user requested it
    if (req.body.deletedPics) {
        deletedPicsArr = JSON.parse(decodeURIComponent(req.body.deletedPics));
        deletePics = {
            cloudinaryDestroyLoop: function() {
                return deletionLoop(req, res, user, deletedPicsArr).then(function(userMinusImages) {
                    return userMinusImages;
                });
            }
        };
        return deletePics.cloudinaryDestroyLoop();
    }
    // otherwise return unchanged user 
    else {
        return {
            user: user,
            deletedAll: false
        };
    }
}

// DELETE helpers
function deletionLoop(req, res, user, picsToDelete) {
    var initialLength = user.pics.length;
    var userMinusImages;
    var deletedAll = false;
    var deletePromises = picsToDelete.map(function(toBeDeleted) {
        return cloudinary.v2.uploader.destroy(toBeDeleted.id).then(function() {
            for (var i = user.pics.length - 1; i >= 0; --i) {
                if (user.pics[i].id == toBeDeleted.id) {
                    user.pics.splice(i, 1);

                    // deletedAll = false;
                    // insert default picture, if user deletes all of the user's pictures
                    if (user.pics.length === 0) {
                        deletedAll = true;
                        user.pics.push({
                            url: "https://res.cloudinary.com/mviladrichhe/image/upload/v1535124174/q7llrbwscquslldy0lus.png",
                            id: "q7llrbwscquslldy0lus"
                        });
                    }

                    // correct for user.pics.length, if all pics were deleted
                    var userPicsLength = deletedAll ? user.pics.length - 1 : user.pics.length;
                    if (initialLength - userPicsLength === picsToDelete.length) {
                        userMinusImages = user;
                    }
                }
            }
        });
    });

    return Promise.all(deletePromises).then(function() {
        return {
            user: userMinusImages,
            deletedAll: deletedAll
        };
    });
}

// ADD helpers
function addSelectedPics(req, res, user, deletedAll) {
    var addPics;
    // only try to add pics if the user requested it
    if (req.files.length > 0) {
        addPics = {
            cloudinaryUpload: function(file) {
                return cloudinary.v2.uploader.upload(file.path).then(function(result) {
                    return result;
                });
            },

            createNewPic: function(file) {
                return this.cloudinaryUpload(file).then(function(result) {
                    return {
                        url: result.secure_url,
                        id: result.public_id
                    };
                });
            },

            updateUserPics: function(file, user) {
                return this.createNewPic(file).then(function(newPic) {
                    // if the only picture is the default one, substitute instead of pushing
                    if (user.pics[0].id === "q7llrbwscquslldy0lus") {
                        user.pics.splice(0, 1, newPic);
                    }
                    else {

                        user.pics.push(newPic);
                    }

                    return user;
                });
            },

            runLoop: function() {
                return additionLoop(req, res, user, this, deletedAll);
            }
        };
        return addPics.runLoop();
    }
    // otherwise return unchanged user
    else {
        return user;
    }
}

function additionLoop(req, res, user, addPics, deletedAll) {
    // adjust user.pics length (we ignore the default profile picture "dummy")
    var initialLength = deletedAll ? user.pics.length - 1 : user.pics.length;
    var userPlusImages;
    var updatePromises = req.files.map(function(file) {
        return addPics.updateUserPics(file, user).then(function(user) {
            if (user.pics.length - initialLength === req.files.length) {
                userPlusImages = user;
            }
        });
    });
    // wait for all image uploads to finish and only then return the user with 
    // their new images
    return Promise.all(updatePromises).then(function() {
        return userPlusImages;
    });
}

function saveAndRedirect(req, res, user) {
    user.description = req.body.description;
    user.save();
    req.flash("success", "Successfully Updated!");
    res.redirect("/users/" + user._id);
}
// USER EDIT HELPER FUNCTIONS

module.exports = router;
