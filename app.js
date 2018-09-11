// This module contains represents the express app itself. It is basically
// responsible for the declaration of general configurations and for launching 
// the app in the first place.

// read environment variables
require("dotenv").config();

var express                 = require("express"),
    app                     = express(),
    
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    flash                   = require("connect-flash"),
    
    // require auth libs
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    expressSession          = require("express-session"),
    
    // require models
    passportLocalMongoose   = require("passport-local-mongoose"),
    expressSession          = require("express-session"),
    
    // require models
    Beach                   = require("./models/beach"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    
    //require routers
    indexRouter             = require("./routes/index"),
    commentRouter           = require("./routes/comments"),
    beachRouter             = require("./routes/beaches"),

    methodOverride          = require("method-override"),
    path                    = require('path');
    
// CONFIGs
var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";

mongoose.connect(url, {useNewUrlParser: true});

app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(expressSession({
    secret: "dontyoulookhere",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    app.locals.moment = require("moment");
    next();
});

// USE ROUTERS
app.use("/", indexRouter);
app.use("/beaches/:id/comments", commentRouter);
app.use("/beaches", beachRouter);

// CONSOLE.LOG ONCE SERVER IS ONLINE
app.listen(process.env.PORT, process.env.IP, function(req, res) {
    console.log("Paralia is online!");
});

