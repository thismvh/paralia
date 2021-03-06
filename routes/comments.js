// This module handles all interactions concerning comments; from creating them
// to deleting them and everything in between

var express          = require("express"),
    router           = express.Router({ mergeParams: true }),
    async            = require("async"),
    Beach            = require("../models/beach"),
    Comment          = require("../models/comment"),
    middleware       = require("../middleware/index"),
    isCommentCreator = middleware.isCommentCreator,
    isLoggedIn       = middleware.isLoggedIn

// NEW - show new comment form
router.get("/new", isLoggedIn, function(req, res) {
    Beach.findById(req.params.id, function(err, foundBeach) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", { beach: foundBeach });
        }
    });
});

// UPDATE - add new comment with data form the form
router.post("/", isLoggedIn, function(req, res) {
    Comment.create(req.body.comment, function(err, newComment) {
        if (err) {
            req.flash("error", "An error occured when creating the comment!");
            res.redirect("back");
        }
        else {
            Beach.findById(req.params.id).populate("comments").exec(function(err, foundBeach) {
                if (err) {
                    req.flash("error", "An error occured when retrieving the corresponding beach!");
                    res.redirect("back");
                }
                else {

                    newComment.author.id = req.user.id;
                    newComment.author.username = req.user.username;
                    newComment.author.pic = req.user.pics[0];
                    newComment.save();

                    foundBeach.comments.push(newComment);
                    foundBeach.rating = getAverageRating(foundBeach);
                    foundBeach.save();
                    req.flash("success", "Comment added");
                    res.redirect("/beaches/" + req.params.id);
                }
            });
        }
    });
});

// EDIT - show comment edit form
router.get("/:comment_id/edit", isCommentCreator, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            req.flash("error", "An error occured when retrieving the comment!");
            res.redirect("back");
        }
        else {
            res.render("comments/edit", { comment: foundComment, campground_id: req.params.id });
        }
    });
});

// UPDATE - edit a comment
router.put("/:comment_id", isCommentCreator, function(req, res) {
    var editedComment = req.body.comment;
    Comment.findByIdAndUpdate(req.params.comment_id, editedComment, function(err, updatedComment) {
        if (err) {
            req.flash("error", "An error occured when updating the comment!");
            res.redirect("back");
        }
        else {
            Beach.findById(req.params.id).populate("comments").exec(async function(err, beach) {
                if (err) {
                    req.flash("error", "Beach associated to comment not found");
                    return res.redirect("back");
                }

                for (var i = beach.comments.length - 1; i >= 0; --i) {
                    if (beach.comments[i].id == updatedComment.id) {
                        beach.comments.splice(i, 0);
                        beach.rating = await getAverageRating(beach);
                    }
                }

                beach.save(function() {
                    req.flash("success", "Comment edited");
                    res.redirect("/beaches/" + req.params.id);
                });
            });
        }
    });
});

// DELETE - delete a comment
router.delete("/:comment_id", isCommentCreator, function(req, res) {
    Beach.findById(req.params.id).populate("comments").exec(async function(err, beach) {
        if (err) {
            console.log(err);
            req.flash("error", "Beach associated to comment not found");
            return res.redirect("back");
        }

        for (var i = beach.comments.length - 1; i >= 0; --i) {
            if (beach.comments[i].id == req.params.comment_id) {
                beach.comments.splice(i, 1);
                if (beach.comments.length < 1) {
                    beach.rating = 0;
                }
                else {
                    beach.rating = await getAverageRating(beach);
                }
            }
        }

        beach.save(function() {
            Comment.findByIdAndRemove(req.params.comment_id, function(err, removedComment) {
                if (err) {
                    req.flash("error", "Comment not found");
                    res.redirect("/beaches");
                }
                else {
                    req.flash("error", "Comment deleted");
                    res.redirect("/beaches/" + req.params.id);
                }
            });
        });
    });
});

function getAverageRating(beach) {
    var sumBeachRatings = 0;
    beach.comments.forEach(function(comment) {
        sumBeachRatings += comment.rating;
    });
    return beach.rating = sumBeachRatings / beach.comments.length;
}

module.exports = router;
