<<<<<<< HEAD
=======

>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
var Beach = require("../models/beach");
var Comment = require("../models/comment");


<<<<<<< HEAD
// define object that will be exported at the end
var middlewareObj = {};

// only logged in user can access certain pages (edit or post routes)
=======
var middlewareObj = {};

>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You must be logged in to do that!");
    res.redirect("/login");
};

<<<<<<< HEAD
// only the profile owner (or an admin) can edit / delete a profile
=======
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
middlewareObj.isProfileOwner = function(req, res, next) {
    if(req.isAuthenticated()) {
        req.params.user_id, function(err, profileOwner) {
            if(err) {
<<<<<<< HEAD
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                // admins have access to any profile
=======
                console.log(err);
                req.flash("error", err.message);
                res.redirect("back");
            } else {
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
                if(req.user._id.equals(profileOwner.id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "You can only edit your own profile!");
                    res.redirect("back");
                }
            }
        };
    } else {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("/login");
    }
};

<<<<<<< HEAD
// only the beach creator can edit / delete the beach
=======
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
middlewareObj.isBeachCreator = function(req, res, next) {
    // check if user is logged in
    if(req.isAuthenticated()) {
        // retrieve the beach in question
        Beach.findById(req.params.id, function(err, foundCampground) {
            if(err) {
<<<<<<< HEAD
                req.flash("error", "An error occured when retrieving the beach to be edited!");
=======
                console.log(err);
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
                res.redirect("back");
            } else {
                // check if current user matches the beach's author
                if(req.user._id.equals(foundCampground.author.id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "You must be the creator to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("back");
    }
};

<<<<<<< HEAD
// only a comment's creator (or an admin) is allowed to edit / delete it 
=======
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
middlewareObj.isCommentCreator = function(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("back");
    } else {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
<<<<<<< HEAD
                req.flash("error", "An error occured when retrieving the comment to be edited!");
                res.redirect("back");
            } else {
=======
                console.log(err);
                res.redirect("back");
            } else {
                console.log(foundComment);
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
                if(req.user._id.equals(foundComment.author.id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "You must be the creator to do that!");
                    res.redirect("back");
                }
            }
        });
    }
};

// EXPORT middleware object
module.exports = middlewareObj;