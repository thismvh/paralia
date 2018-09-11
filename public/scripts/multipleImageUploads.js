<<<<<<< HEAD
// This module handles the frontend of uploading multiple images (a.k.a. when 
// editing a beach or a user's profile). It also makes sure the correct files 
// are passed onto the backend post (or update) route

$(document).ready(function() {
    var imageInput = document.getElementById("picURL");
    var alreadyAdded = false;
    var deleteIcon = $(".fa-trash-alt");
    addDeleteIconListeners();
    deleteIcon.css("opacity", 0.7);
    
    // listen for changes on the input field and execute an action depending on 
    // whether images were already added
    imageInput.addEventListener("change", function(event) {
=======
$(document).ready(function() {
    var deleteIcon = $(".fa-trash-alt");
     
    addDeleteIcons();
    deleteIcon.css("opacity", 0.7);

    var imageInput = document.getElementById("picURL");
    var alreadyAdded = false;
    
    imageInput.addEventListener("change", function(event, data) {
        if(data) {
          alert(data.finalUploads);
        }
        
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
        displayAddedImages(event.target, alreadyAdded);
        alreadyAdded = true;
    });
    
<<<<<<< HEAD
    // add a hidden input on form submit such that the list of pictures the user 
    // wants to delete is accessible in the backend update route
    $("#form").submit(function(event) {
        $('<input />').attr('type', 'hidden')
            .attr('name', "deletedPics")
            .attr('value', encodedArray)
            .appendTo(this);
        return true;
    });

    var deletedPicsJS = []; // dynamically stores pics to be deleted
    var encodedArray;       // encoded version of the array above (facilitates 
                            // the transition to the backend)

    function addDeleteIconListeners() {
        var uploadedImage = $("#uploadedImages .big-profile-pic");
        var deleteIconDiv = $(".card-img-overlay");
        var deleteIcon = $(".fa-trash-alt");
        
        // detach overlay elements from the DOM such that they do not interfere
        // with the uploadedImage listeners (see below)
        var detachedDiv = deleteIconDiv.detach();
        var detachedIcon = deleteIcon.detach();

=======
    $("#form").submit( function(event) {
      $('<input />').attr('type', 'hidden')
          .attr('name', "deletedPics")
          .attr('value', encodedArray)
          .appendTo(this);
      return true;
    });
    
    
    // arrays for regular delete operation
    var deletedPicsJS = [];
    var encodedArray;
    
    // arrays for undoing the addition of an image
    // var canceledUploads = [];
    
    function addDeleteIcons() {
        var uploadedImage = $("#uploadedImages .big-profile-pic");
        var deleteIconDiv = $(".card-img-overlay");
        var deleteIcon = $(".fa-trash-alt");
        var detachedDiv = deleteIconDiv.detach();
        var detachedIcon = deleteIcon.detach();
        
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
        uploadedImage.mouseenter(function(event) {
            $(event.target).css("opacity", 0.4);
            $(event.target).css("transition", "all 0.4s ease-in-out");
            $(event.target).after(deleteIconDiv.first());
            deleteIconDiv.first().append(deleteIcon.first()).hide().fadeIn(400, deleteListener(deleteIcon));
        })
        
<<<<<<< HEAD
        // also refers to uploadedImage (different listener due to overlay 
        // elements)
=======
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
        $(".row > .col").mouseleave(function(event) {
            var profilePic = $(".row > .col > .big-profile-pic");
            profilePic.css("opacity", 1);
            profilePic.css("transition", "all 0.4s ease-in-out");
            $(".row > .col > .card-img-overlay").detach();
        });
    }
    
<<<<<<< HEAD
    // when a delete button is clicked, add the corresponding image to the 
    // images to be deleted array (deletedPicsJS)
    function deleteListener(deleteIcon) {
        deleteIcon.on("click", function(event) {
            var imageSrc = $(event.target).parent().prev().get(0).src
            var imageId = $(event.target).parent().prev().get(0).id

=======
    function deleteListener(deleteIcon) {
        deleteIcon.on("click", function(event) {
            var imageSrc =  $(event.target).parent().prev().get(0).src
            var imageId =   $(event.target).parent().prev().get(0).id
            
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
            var image = {
                url: imageSrc,
                id: imageId
            };
<<<<<<< HEAD

            var imageContainer = $(event.target).parent().parent();
            if (!occursTwice(deletedPicsJS, image) && !wasJustAdded(imageContainer)) {
                deletedPicsJS.push(image);
                encodedArray = encodeURIComponent(JSON.stringify(deletedPicsJS));
            }

            imageContainer.fadeOut(function() {
                $(this).remove();
            });
        });
    }
    
    // If this is the first attempt to upload new images, simply display them 
    // together with the old images.
    // Otherwise, remove the previous image upload before display the new one
    function displayAddedImages(imageInput, alreadyAdded) {
        var imageDiv = imageInput.nextElementSibling;
        if (alreadyAdded) {
            while (imageDiv.lastElementChild.getAttribute("class").indexOf("to-be-added") !== -1) {
=======
            
            var imageContainer = $(event.target).parent().parent();
            if(!occursTwice(deletedPicsJS, image) && !wasJustAdded(imageContainer)) {
                deletedPicsJS.push(image);
                console.log("deletedPicsJS.length: " + deletedPicsJS.length)
                encodedArray = encodeURIComponent(JSON.stringify(deletedPicsJS));
            }
            
            imageContainer.fadeOut(function() {
                $(this).remove();
            });
            
            // var currentFiles = document.getElementById("picURL").files;
            // console.log("canceledUploads.length: " + canceledUploads.length);
            // var imgToBeDeleted = $(imageContainer).children();
            // if(wasJustAdded(imageContainer)) {
            //     for(var i = 0; i < currentFiles.length; i++) {
            //         if(currentFiles[i].name === imgToBeDeleted.attr("id") && !alreadyExists(canceledUploads, currentFiles[i])) {
            //             canceledUploads.push(currentFiles[i]);
            //         }
            //     }
            // }
            
            // console.log("canceledUploads.length after loop: " + canceledUploads.length);
            
            
        });        
    }
    
    function displayAddedImages(imageInput, alreadyAdded) {
        var imageDiv = imageInput.nextElementSibling;
        if(alreadyAdded) {
            while(imageDiv.lastElementChild.getAttribute("class").indexOf("to-be-added") !== -1) {
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
                console.log(imageDiv.lastElementChild);
                imageDiv.removeChild(imageDiv.lastElementChild);
            };
        }
<<<<<<< HEAD

=======
        
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
        for (var i = 0; i < imageInput.files.length; i++) {
            (function(file) {
                var file = imageInput.files[i];
                
<<<<<<< HEAD
                // create a new image container
                var newCol = document.createElement("div");
                newCol.setAttribute("id", "uploadedImages");
                newCol.setAttribute("class", "col my-2 to-be-added");
                
                // create a new image element and style it using classes
                var img = document.createElement("img");
                img.setAttribute("id", file.name)
                img.setAttribute("class", "big-profile-pic card-img-top");
                
                // read the input file and set it as the img's src to be displayed
                var reader = new FileReader();
                reader.onloadend = function() {
                    img.src = reader.result;
                }

                reader.readAsDataURL(file);
                newCol.appendChild(img);
                
                // fade in newly added image
=======
                var newCol = document.createElement("div");
                    newCol.setAttribute("id", "uploadedImages");
                    newCol.setAttribute("class", "col my-2 to-be-added");
                
                var img = document.createElement("img");
                    img.setAttribute("id", file.name)
                    img.setAttribute("class", "big-profile-pic card-img-top");
                    var reader = new FileReader();
                    reader.onloadend = function() {
                         img.src = reader.result;
                    }
                    
                reader.readAsDataURL(file);
                newCol.appendChild(img);
                
                var deleteButtonDiv = document.createElement("div");
                    deleteButtonDiv.setAttribute("class", "card-img-overlay d-flex flex-column justify-content-center");
                
                var deleteButton = document.createElement("i");
                    deleteButton.setAttribute("class", "fas fa-trash-alt");
                    
                deleteButtonDiv.appendChild(deleteButton);
                newCol.appendChild(deleteButtonDiv);
                // imageInput.nextElementSibling.appendChild(newCol);
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
                $(newCol).hide().appendTo(imageInput.nextElementSibling).fadeIn(700);
            })();
        }
    }
<<<<<<< HEAD
});
=======
})
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8

function occursTwice(arr, itemOfInterest) {
    var occursTwice = false;
    arr.forEach(function(item) {
<<<<<<< HEAD
        if (item.id === itemOfInterest.id) {
            occursTwice = true;
            return occursTwice;
        }
    });

    return occursTwice;
}

function wasJustAdded(element) {
    return element.attr("class").indexOf("to-be-added") !== -1;
}
=======
        if(item.id === itemOfInterest.id) {
            occursTwice = true;
            return occursTwice
        }
    });
    
    return occursTwice;
}

// function alreadyExists(arr, itemOfInterest) {
//     var alreadyExists = false;
//     arr.forEach(function(item) {
//         if(item === itemOfInterest) {
//             alreadyExists = true;
//             return alreadyExists
//         }
//     });
    
//     return alreadyExists;
// }

function wasJustAdded(element) {
    return element.attr("class").indexOf("to-be-added") !== -1;
}

// function getFinalUploads(initialUploads, canceledUploads) {
//     var finalUploads = transferArray(initialUploads);
//     for(var i = 0; i < initialUploads.length; i++) {
//         for(var j = 0; j < canceledUploads.length; j++) {
//             if(initialUploads[i] === canceledUploads[j]) {
//                 finalUploads.splice(i, 1);
//             }
//         }
//     }
    
//     return finalUploads;
// }

// function transferArray(imageInputFiles) {
//     var newArr = [];
//     for(var i = 0; i < imageInputFiles.length; i++) {
//         newArr.push(imageInputFiles[i]);
//     }
    
//     return newArr;
// }
>>>>>>> a08646db13706bb586611edf78d79f049d051aa8
