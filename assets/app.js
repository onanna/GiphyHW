// Initial array of animals
var animals = ["kangaroo", "Tiger", "monkey", "zebra", "eagle", "elephant"];
var amount= [1,2,3,4,5,6,7,8,9,10,11,12];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=x8yAyu1xp1MRX1C3aQjtJahAr5047i7j&q="+animal;
  

  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
        for (var k = 0; k < amount.length; k++) { //forloop to make 10 appear
    // Creating a div to hold the animal
    var animalDiv = $("<div class='animal'>");

    // Storing the rating data
    var rating = response.data[k].rating;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    animalDiv.append(pOne);


    // Retrieving the URL for the image
    var imgURL = response.data[k].images.fixed_height.url;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    animalDiv.append(image);
        
    // Putting the entire animal above the previous animals
    $("#giphy-view").prepend(animalDiv);
              }//forloop end
  });

}

// Function for displaying animal data
function renderButtons() {

  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of animal-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a animal button is clicked
$("#add-giphy").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#giphy-input").val().trim();

  // Adding animal from the textbox to our array
  animals.push(animal);

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();