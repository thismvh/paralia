<<<<<<< HEAD
// This module handles the frontend of uploading a single image (a.k.a. when 
// signing up or creating a beach). It also makes sure the correct file are 
// passed onto the backend post (or update) route

var imageInput = document.getElementById("singleInput");
var alreadyAdded = false;
var picsContainer = document.getElementById("singlePicContainer");

// listen for changes on the input field and either add a new image or replace
// the current one
imageInput.addEventListener("change", function(event) {
var file = event.target.files[0];

// add a new image container if no image has been added yet
if (!alreadyAdded) {
    alreadyAdded = true;
    
    // create new image container (i.e. a new column in boostrap's grid system)
    var newCol = document.createElement("div");
    newCol.setAttribute("id", "uploadedImages");
    newCol.setAttribute("class", "col my-2 to-be-added");
    
    // create a new image element and style it appropriately using classes
    var img = document.createElement("img");
    img.setAttribute("id", file.name);
    img.setAttribute("class", "big-profile-pic card-img-top");
    
    // read the input file and set it as the img's src in order to be displayed
    var reader = new FileReader();
    reader.onloadend = function() {
        img.src = reader.result;
    };

    reader.readAsDataURL(file);
    newCol.appendChild(img);
    
    // fade in the newly added picture container
    $(newCol).hide().appendTo(picsContainer).delay(200).fadeIn(700);

}
// if an image was already added, simply update the current img's src 
// property
else {
    // select the image (see html structure) and update img id property
    var img = event.target.nextElementSibling.children[0].children[0];
    img.setAttribute("id", file.name);
    
    // update img src property in order to display the new image
    var readerReplace = new FileReader();
    readerReplace.onloadend = function() {
        img.setAttribute("src", readerReplace.result);
    };
    readerReplace.readAsDataURL(file);
    
    // fade in newly updated image
    $(img).hide().fadeIn(700)
}
});
=======
    var imageInput = document.getElementById("singleInput");
    var alreadyAdded = false;
    var picsContainer = document.getElementById("singlePicContainer");
    
    imageInput.addEventListener("change", function(event) {
        var file = event.target.files[0];
        
        if(!alreadyAdded) {
            alreadyAdded = true;
            
            var newCol = document.createElement("div");
                newCol.setAttribute("id", "uploadedImages");
                newCol.setAttribute("class", "col my-2 to-be-added");
            
            var img = document.createElement("img");
                img.setAttribute("id", file.name);
                img.setAttribute("class", "big-profile-pic card-img-top");
                var reader = new FileReader();
                reader.onloadend = function() {
                     img.src = reader.result;
                };
                
            reader.readAsDataURL(file);
            newCol.appendChild(img);
            
            $(newCol).hide().appendTo(picsContainer).delay(200).fadeIn(700);
            
        } else {
            
            var img = event.target.nextElementSibling.children[0].children[0];
            img.setAttribute("id", file.name);
            
            var readerReplace = new FileReader();
            readerReplace.onloadend = function() {
                 img.setAttribute("src", readerReplace.result);
            };
            readerReplace.readAsDataURL(file);
            $(img).hide().fadeIn(700)
        }
    });
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
