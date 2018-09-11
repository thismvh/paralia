<<<<<<< HEAD
// This module handles all interactions concerning beaches; from creating them
// to deleting them and everything in between

=======
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
var express = require("express"),
    router = express.Router(),
    Beach = require("../models/beach"),
    middleware = require("../middleware"),
    isBeachCreator = middleware.isBeachCreator,
    isLoggedIn = middleware.isLoggedIn,
<<<<<<< HEAD
    multer = require('multer'),

    storage = multer.diskStorage({
        filename: function(req, file, callback) {
            callback(null, Date.now() + file.originalname);
        }
    }),

    imageFilter = function(req, file, cb) {
=======
    multer      = require('multer'),
    
    storage = multer.diskStorage({
      filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
      }
    }),
    
    imageFilter = function (req, file, cb) {
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
        // accept image files only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
<<<<<<< HEAD

    upload = multer({ storage: storage, fileFilter: imageFilter }),

    cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'mviladrichhe',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);

// GET - Home
router.get("/", function(req, res) {
    Beach.find({}, function(err, allBeaches) {
        if (err) {
            console.log(err);
        }
        else {
            // render the beaches page with all beaches in the database
            res.render("beaches/beaches", { beaches: allBeaches });
=======
    
    upload = multer({ storage: storage, fileFilter: imageFilter}),
    
    cloudinary = require('cloudinary');
    cloudinary.config({ 
      cloud_name: 'mviladrichhe', 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

// GET - BEACHES
router.get("/", function(req, res) {
    Beach.find({}, function(err, allBeaches) {
        if(err) {
            console.log(err);
        } else {
            // render the beaches page with all beaches in the database
            res.render("beaches/beaches", {beaches: allBeaches});
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
        }
    })
})

<<<<<<< HEAD
// POST - Create a new beach out of the data from the form
router.post("/", isLoggedIn, upload.single("image"), function(req, res) {
    geocoder.geocode(req.body.beach.location, function(err, data) {
        if (err || !data.length) {
            req.flash('error', 'Invalid address');
            console.log(err);
            return res.redirect('back');
=======
// POST - BEACHES
router.post("/", isLoggedIn, upload.single("image"), function(req, res) {
    geocoder.geocode(req.body.beach.location, function (err, data) {
        if (err || !data.length) {
          req.flash('error', 'Invalid address');
          console.log(err);
          return res.redirect('back');
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
<<<<<<< HEAD

        cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
            if (err) {
                req.flash('error', err.message);
                return res.redirect('back');
            }
            // push a new pic object with cloudinary url and id to beach object
            req.body.beach.pics = [{
                url: result.secure_url,
                id: result.public_id
            }]

            // add author to beach
            req.body.beach.author = {
                id: req.user._id,
                username: req.user.username
            }

            req.body.beach.lat = lat;
            req.body.beach.lng = lng;
            req.body.location = location;

            Beach.create(req.body.beach, function(err, beach) {
                if (err) {
                    req.flash('error', err.message);
                    return res.redirect('back');
                }
                req.flash('success', 'Successfully added beach');
                res.redirect('/beaches/' + beach.id);
            });
=======
        
        cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
          if(err) {
            req.flash('error', err.message);
            return res.redirect('back');
          }
          // push a new pic object with cloudinary url and id to beach object
          req.body.beach.pics = [{
                                url: result.secure_url, 
                                id: result.public_id
                              }]
          
          // add author to beach
          req.body.beach.author = {
            id: req.user._id,
            username: req.user.username
          }
          
          req.body.beach.lat = lat;
          req.body.beach.lng = lng;
          req.body.location = location;
          
          Beach.create(req.body.beach, function(err, beach) {
            if (err) {
              req.flash('error', err.message);
              return res.redirect('back');
            }
            req.flash('success', 'Successfully added beach');
            res.redirect('/beaches/' + beach.id);
          });
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
        });
    });
});

<<<<<<< HEAD
// NEW - Show the new beach form
router.get("/new", isLoggedIn, function(req, res) {
    // render the form page
    res.render("beaches/new", { message: req.flash("error") });
=======
// NEW - NEW BEACH FORM
router.get("/new", isLoggedIn, function(req, res) {
    // render the form page
    res.render("beaches/new", {message: req.flash("error")});
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
})

// SHOW - EXPAND ONE BEACH IN PARTICULAR
router.get("/:id", function(req, res) {
    // find the particular beach and populate comments to display them in full length
    Beach.findById(req.params.id).populate("comments").exec(function(err, foundBeach) {
<<<<<<< HEAD
        if (err) {
            console.log(err);
        }
        else {
            res.render("beaches/show", { beach: foundBeach });
=======
        if(err) {
            console.log(err);
        } else {
            res.render("beaches/show", {beach: foundBeach});
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
        }
    });
});

<<<<<<< HEAD
// Show beach edit form
router.get("/:id/edit", isBeachCreator, function(req, res) {
    Beach.findById(req.params.id, function(err, foundBeach) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("beaches/edit", { beach: foundBeach });
=======
// BEACH EDIT ROUTES
router.get("/:id/edit", isBeachCreator, function(req, res) {
    Beach.findById(req.params.id, function(err, foundBeach) {
        if(err) {
            console.log(err);
        } else {
            res.render("beaches/edit", {beach: foundBeach});     
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
        }
    });
});

<<<<<<< HEAD
// UPDATE beach according to the data received from the form
router.put("/:id", isBeachCreator, upload.array('image'), function(req, res) {
    var addOrDeletePics = {
        findBeach: function() {
            return Beach.findById(req.params.id).then(function(beach) {
                return beach;
            });
        },

        deletePics: function() {
            return this.findBeach().then(function(beach) {
                return deleteSelectedPics(req, res, beach);
            });
        },

        addPics: function() {
            return this.deletePics().then(function(result) {
                return addSelectedPics(req, res, result.beach, result.deletedAll);
            });
        },

        updateBeach: function() {
            return this.addPics().then(function(beach) {
                saveAndRedirect(req, res, beach);
            });
        }
    };

    addOrDeletePics.updateBeach();
});

router.delete("/:id", isBeachCreator, function(req, res) {
    Beach.findByIdAndRemove(req.params.id, function(err, removedBeach) {
        if (err) {
            console.log(err);
            req.flash("error", "Sorry, something went wrong...");
            res.redirect("/beaches" + req.params.id);
        }
        else {
            req.flash("error", "Beach deleted");
            res.redirect("/beaches");
        }
    });
});


// BEACH EDIT HELPER FUNCTIONS

// DELETE helpers
function deleteSelectedPics(req, res, beach) {
    var deletedPicsArr, deletePics;
    // only try to delete pics if the user requested it
    if (req.body.deletedPics) {
        deletedPicsArr = JSON.parse(decodeURIComponent(req.body.deletedPics));
        deletePics = {
            cloudinaryDestroyLoop: function() {
                return deletionLoop(req, res, beach, deletedPicsArr).then(function(campgroundMinusImages) {
                    return campgroundMinusImages;
                });
            }
        };
        return deletePics.cloudinaryDestroyLoop();
    }
    // otherwise return unchanged beach
    else {
        return {
            beach: beach,
            deletedAll: false
        };
    }
}

function deletionLoop(req, res, beach, picsToDelete) {
    var initialLength = beach.pics.length;
    var campgroundMinusImages;
    var deletedAll = false;
    var deletePromises = picsToDelete.map(function(toBeDeleted) {
        return cloudinary.v2.uploader.destroy(toBeDeleted.id).then(function() {
            for (var i = beach.pics.length - 1; i >= 0; --i) {
                if (beach.pics[i].id == toBeDeleted.id) {
                    beach.pics.splice(i, 1);
                    
                    // insert default picture, if beach deletes all of the beach's pictures
                    if (beach.pics.length === 0) {
                        deletedAll = true;
                        beach.pics.push({
                            url: "https://res.cloudinary.com/mviladrichhe/image/upload/v1535124174/q7llrbwscquslldy0lus.png",
                            id: "q7llrbwscquslldy0lus"
                        });
                    }

                    // correct for beach.pics.length, if all pics were deleted
                    var campgroundPicsLength = deletedAll ? beach.pics.length - 1 : beach.pics.length;
                    if (initialLength - campgroundPicsLength === picsToDelete.length) {
                        campgroundMinusImages = beach;
                    }
                }
            }
        });
    });
    
    // wait for all delete promises to resolve before returning user
    return Promise.all(deletePromises).then(function() {
        return {
            beach: campgroundMinusImages,
            deletedAll: deletedAll
        };
    });
}

// ADD helpers
function addSelectedPics(req, res, beach, deletedAll) {
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

            updateBeachPics: function(file, beach) {
                return this.createNewPic(file).then(function(newPic) {
                    // if the only picture is the default one, substitute instead of pushing
                    if (beach.pics[0].id === "q7llrbwscquslldy0lus") {
                        beach.pics.splice(0, 1, newPic);
                    }
                    else {

                        beach.pics.push(newPic);
                    }

                    return beach;
                });
            },

            runLoop: function() {
                return additionLoop(req, res, beach, this, deletedAll);
            }
        };

        return addPics.runLoop();

    }
    // otherwise return unchanged beach
    else {
        return beach;
    }
}

function additionLoop(req, res, beach, addPics, deletedAll) {
    var initialLength = deletedAll ? beach.pics.length - 1 : beach.pics.length;
    var campgroundPlusImages;
    var updatePromises = req.files.map(function(file) {
        return addPics.updateBeachPics(file, beach).then(function(beach) {
            if (beach.pics.length - initialLength === req.files.length) {
                campgroundPlusImages = beach;
            }
        });
    });
    return Promise.all(updatePromises).then(function() {
        return campgroundPlusImages;
=======
router.put("/:id", isBeachCreator, upload.array('image'), function(req, res) {
  var addOrDeletePics = {
    findBeach: function() {
      return Beach.findById(req.params.id).then(function (beach) {
        return beach;
      });
    },
    
    deletePics: function() {
      return this.findBeach().then(function(beach) {
        return deleteSelectedPics(req, res, beach);
      });
    },
    
    addPics: function() {
      return this.deletePics().then(function(result) {
        return addSelectedPics(req, res, result.beach, result.deletedAll);
      });
    },
    
    updateBeach: function() {
      return this.addPics().then(function(beach) {
        saveAndRedirect(req, res, beach);
      });
    }
  };
  
  addOrDeletePics.updateBeach();
});
// USER EDIT ROUTES

// BEACH EDIT HELPER FUNCTIONS
function deleteSelectedPics(req, res, beach) {
  var deletedPicsArr, deletePics;
  if(req.body.deletedPics) {
    deletedPicsArr = JSON.parse(decodeURIComponent(req.body.deletedPics));
    deletePics = {
      cloudinaryDestroyLoop: function() {
        return deletionLoop(req, res, beach, deletedPicsArr).then(function(campgroundMinusImages) {
          return campgroundMinusImages;
        });
      }
    };
    
    return deletePics.cloudinaryDestroyLoop();
    
  } else {
    return {
      beach: beach,
      deletedAll: false
    };
  }    
}

function addSelectedPics(req, res, beach, deletedAll) {
  
  var addPics;
  if(req.files.length > 0) {
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
      
      updateBeachPics: function(file, beach) {
        return this.createNewPic(file).then(function(newPic) {
          // if the only picture is the default one, substitute instead of pushing
          if(beach.pics[0].id === "q7llrbwscquslldy0lus") {
              beach.pics.splice(0, 1, newPic);
          } else {
            
            beach.pics.push(newPic);
          }
          
          return beach;
        });
      },
      
      runLoop: function() {
        return additionLoop(req, res, beach, this, deletedAll);
      }
    };
    
    return addPics.runLoop();
    
  } else {
    return beach;
  }
}

function deletionLoop(req, res, beach, picsToDelete) {
  var initialLength = beach.pics.length;
  var campgroundMinusImages;
  var deletedAll = false;
  var deletePromises = picsToDelete.map(function(toBeDeleted) {
    return cloudinary.v2.uploader.destroy(toBeDeleted.id).then(function() {
      for (var i = beach.pics.length - 1; i >= 0; --i) {
        if (beach.pics[i].id == toBeDeleted.id) {
          beach.pics.splice(i, 1);
          
          // deletedAll = false;
          // insert default picture, if beach deletes all of the beach's pictures
          if(beach.pics.length === 0) {
            deletedAll = true;
            beach.pics.push(
              {
                url: "https://res.cloudinary.com/mviladrichhe/image/upload/v1535124174/q7llrbwscquslldy0lus.png", 
                id: "q7llrbwscquslldy0lus"
              });
          }
          
          // correct for beach.pics.length, if all pics were deleted
          var campgroundPicsLength = deletedAll ? beach.pics.length - 1 : beach.pics.length;
          if(initialLength - campgroundPicsLength  === picsToDelete.length) {
            campgroundMinusImages = beach;
          }
        }
      }
    });
  });
  
  return Promise.all(deletePromises).then(function() {
    return {
      beach: campgroundMinusImages,
      deletedAll: deletedAll
    };
  });
}

function additionLoop(req, res, beach, addPics, deletedAll) {
    
  var initialLength = deletedAll ? beach.pics.length - 1 : beach.pics.length;
    var campgroundPlusImages;
    var updatePromises = req.files.map(function(file) {
      return addPics.updateBeachPics(file, beach).then(function(beach) {
        if(beach.pics.length - initialLength === req.files.length) {
          campgroundPlusImages = beach;
        }
      });
    });
    
    return Promise.all(updatePromises).then(function() {
      return campgroundPlusImages;
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
    });
}

function saveAndRedirect(req, res, beach) {
    beach.save();
<<<<<<< HEAD
    req.flash("success", "Successfully Updated!");
=======
    req.flash("success","Successfully Updated!");
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
    res.redirect("/beaches/" + beach._id);
}
// BEACH EDIT HELPER FUNCTIONS

<<<<<<< HEAD
module.exports = router;
=======
router.delete("/:id", isBeachCreator, function(req, res) {
    Beach.findByIdAndRemove(req.params.id, function(err, removedBeach) {
        if(err) {
            console.log(err);
            req.flash("error", "Sorry, something went wrong...");
            res.redirect("/beaches" + req.params.id);
        } else {
            req.flash("error", "Beach deleted");
            res.redirect("/beaches");
        }
    });
});

module.exports = router;
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
