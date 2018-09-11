
var Beach = require("../models/beach");
var Comment = require("../models/comment");


// define object that will be exported at the end
var middlewareObj = {};

// only logged in user can access certain pages (edit or post routes)
middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You must be logged in to do that!");
    res.redirect("/login");
};

// only the profile owner (or an admin) can edit / delete a profile
middlewareObj.isProfileOwner = function(req, res, next) {
    if(req.isAuthenticated()) {
        req.params.user_id, function(err, profileOwner) {
            if(err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                // admins have access to any profile
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

// only the beach creator can edit / delete the beach
middlewareObj.isBeachCreator = function(req, res, next) {
    // check if user is logged in
    if(req.isAuthenticated()) {
        // retrieve the beach in question
        Beach.findById(req.params.id, function(err, foundCampground) {
            if(err) {
                req.flash("error", "An error occured when retrieving the beach to be edited!");
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

// only a comment's creator (or an admin) is allowed to edit / delete it 
middlewareObj.isCommentCreator = function(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("back");
    } else {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                req.flash("error", "An error occured when retrieving the comment to be edited!");
                res.redirect("back");
            } else {
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