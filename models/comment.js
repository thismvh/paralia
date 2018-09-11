// This module defines a Comment model (for the database) that will be 
// accessible all throughout the app

var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    rating: { type: Number, default: 0 },

    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        pic: {
            url: String,
            id: String
        }
    },

    createdAt: { type: Date, default: Date.now }
})

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
