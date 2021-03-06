// This module defines a User model (for the database) that will be accessible 
// all throughout the app

var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose")

var userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    password: String,

    pics: {
        type: [{
            url: String,
            id: String
        }],

        default: [{
            url: "https://res.cloudinary.com/mviladrichhe/image/upload/v1535111879/c6luj5alnbrk0scf7tcf.png",
            id: "c6luj5alnbrk0scf7tcf"
        }]

    },

    description: { type: String, default: "No description available yet" },
    isAdmin: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

// add passportLocalMongoose for user auth
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;
