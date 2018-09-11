<<<<<<< HEAD
// This module defines a Comment model (for the database) that will be 
// accessible all throughout the app

=======
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
<<<<<<< HEAD
    rating: { type: Number, default: 0 },

=======
    rating: {type: Number, default: 0},
    
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
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
<<<<<<< HEAD

    createdAt: { type: Date, default: Date.now }
=======
    
    createdAt: {type: Date, default: Date.now}
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
})

var Comment = mongoose.model("Comment", commentSchema);

<<<<<<< HEAD
module.exports = Comment;
=======
module.exports = Comment;
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
