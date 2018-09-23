var arrayGIF = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
];

$.each(arrayGIF, function (index, value) {
    var btn = $("<button>");
    btn.attr("data-animal", value);
    btn.text(value);
    btn.addClass("btn btn-primary");
    $("#buttons-appear-here").append(btn);
});


$("#target").submit(function (event) {
    event.preventDefault();
    var userI = $("#userInput").val();
    arrayGIF.push(userI);
    console.log(arrayGIF);
    var btn = $("<button>");
    btn.attr("data-animal", userI);
    btn.text(userI);
    btn.addClass("btn btn-primary ");
    $("#buttons-appear-here").append(btn);
    setTimeout(function(){
        $("#userInput").val('');
    }, 2000);


});

//Event listener to change the data-state attribute of each animal image
$(document).on("click", ".animal-image", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Adding click event listen listener to all buttons
$(document).on("click", "button ", function () {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");
    $(this).addClass('animated swing');

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            $("#gifs-appear-here").empty();


            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                // Creating and storing an image tag
                var animalImage = $("<img>");

                // Setting the src attribute of the image to a property pulled off the result item
                // animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(animalDiv);
            }
        });
});

// Function to automatically click the first button clicked.
jQuery(function(){
    jQuery('button:first').click();
 });