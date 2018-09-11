<<<<<<< HEAD
// This module defines a Beach model (for the database) that will be accessible 
// all throughout the app

=======
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
var mongoose = require("mongoose");

// define the general pattern each new beach must follow
var beachSchema = new mongoose.Schema({
    name: String,
<<<<<<< HEAD
    rating: { type: Number, default: 0 },

    pics: [{
        url: String,
        id: String
    }],

=======
    rating: {type: Number, default: 0},
    
    pics:  [{
                url:    String,
                id:     String
            }],
            
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
    price: String,
    location: String,
    lat: Number,
    lng: Number,
<<<<<<< HEAD
    createdAt: { type: Date, default: Date.now },
    description: String,

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],

=======
    createdAt: {type: Date, default: Date.now},
    description: String,
    
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

<<<<<<< HEAD
// compile our schema into a model for further use
var Beach = mongoose.model("Beach", beachSchema);

module.exports = Beach;
=======
// compile our schema into a model that we can call function upon
var Beach = mongoose.model("Beach", beachSchema);

module.exports = Beach;
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
