// Initial array of emotions
var emotions= ["surprised", "excited", "relaxed", "frightened","annoyed", "happy", "disgusted", "disappointed", "bored", "sleepy", "confused", "calm", "awkward"];

function displayGifs() {
    // Deleting the emotions prior to adding new ones
    $("#emotion-disply").empty();

    var emotion = $(this).attr("data-emotion");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&apikey=qDbPluXgfXDVwNDnEsM3lSq5IxCA7lLe&limit=10&rating=PG-13";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
      var results = response.data;


    // Looping through array of results 
      for (var i = 0; i < results.length; i++) {
    
      var emotionDiv = $("<div>");
        emotionDiv.addClass("emotion-div");

      var gifImg = $("<img>");
        gifImg.addClass("gif"); 
        gifImg.attr("src", results[i].images.fixed_height_still.url);
        gifImg.attr("alt", emotion + [i]);
        gifImg.attr("data-state", "still");
        gifImg.attr("data-still", results[i].images.fixed_height_still.url);
        gifImg.attr("data-animate", results[i].images.fixed_height.url);
      
      var gifTitle = $("<p class='title'>")
        gifTitle.text("Title: " + results[i].title);

      var gifRating = $("<p class='rating'>");
        gifRating.text("Rating: " + results[i].rating);

      emotionDiv.html(gifImg);
      emotionDiv.append(gifRating);
      gifRating.prepend(gifTitle);
      $("#emotion-disply").prepend(emotionDiv);
      }
    })
  };


function renderButtons() {
  // Deleting the buttons prior to adding new ones
  $("#buttons-disply").empty();

// Looping through the array and generating buttons for each emotion in the array
for (i = 0; i < emotions.length; i++){
    var emotionBtn = $("<button>");
    emotionBtn.text(emotions[i]);
    emotionBtn.addClass("emotion-btn");
    emotionBtn.attr("data-emotion", emotions[i]);

    $("#buttons-disply").append(emotionBtn);
}
};

$("#add-emotion").on("click", function(event) {
    event.preventDefault();

    var emotionInput = $("#emotion-input").val().trim();
    emotions.push(emotionInput);

    renderButtons();
  });


 // Function for displaying the gifs
  $(document).on("click", ".emotion-btn", displayGifs);

  $(document).on("click",".gif", function() {
   
    var state = $(this).attr("data-state");
    
    // When the user clicks one of the still GIPHY images, the gif animates. 
    //If the user clicks the gif again, it stops playing.
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

// Calling the renderButtons function to display the intial buttons
  renderButtons();