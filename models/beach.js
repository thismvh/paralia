// This module defines a Beach model (for the database) that will be accessible 
// all throughout the app

var mongoose = require("mongoose");

// define the general pattern each new beach must follow
var beachSchema = new mongoose.Schema({
    name: String,
    rating: { type: Number, default: 0 },

    pics: [{
        url: String,
        id: String
    }],

    price: String,
    location: String,
    lat: Number,
    lng: Number,
    createdAt: { type: Date, default: Date.now },
    description: String,

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],

    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// compile our schema into a model for further use
var Beach = mongoose.model("Beach", beachSchema);

module.exports = Beach;
