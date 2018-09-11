var mongoose    = require("mongoose");
var Beach  = require("./models/beach");
var Comment     = require("./models/comment");
 
var seeds = [
    {
        name: "Cloud's Rest", 
        image: "https://bit.ly/2JFHZSy",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        comments: []
    },
    {
        name: "Desert Mesa", 
        image: "https://bit.ly/2NA5QWb",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        comments: []
    },
    {
        name: "Canyon Floor", 
        image: "https://bit.ly/2uOwaE8",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        comments: []
    }
]
 
function seedDB(){
   //Remove all beaches
   Beach.remove({}, function(err){
        if(err){
            console.log(err);
        }
        
        console.log("removed beaches!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            
             //add a few beaches
            seeds.forEach(function(seed){
                Beach.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        console.log(campground);
                        
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                        });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;