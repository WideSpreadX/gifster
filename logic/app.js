const comedies = ["fall funny", "funny meme", "you had one job", "funny weekend", "funny coding"];

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < comedies.length; i++) {

        var gifBtn = $("<button>");
        gifBtn.addClass("comedy");
        gifBtn.attr("data-comedy", comedies[i]);
        gifBtn.text(comedies[i]);
        $("#buttons-view").append(gifBtn);
    }
}
$("#add-comedy").on("click", function (event) {
    event.preventDefault();
    var comedy = $("#comedy-input").val().trim();
    if (comedy === "") {
        return false;
    }
    comedies.push(comedy);
    $("#comedy-input").val(" ");
    renderButtons();
});

renderButtons();

$("#remove-comedy").on("click", function () {
    comedies.pop();
    renderButtons();
    return false;
});

//--------------------------------------------------------------------Displaying gifs

$(document).on("click", ".comedy", function () {
    var comedy = $(this).attr("data-comedy");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedy + "&api_key=fIJaqVlWoTrh9SXh5DqUd3qva4eVsiAV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div>");

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var comedyImage = $("<img>");
                    comedyImage.attr("src", results[i].images.fixed_height_still.url);
                    comedyImage.attr("data-still", results[i].images.fixed_height_still.url);
                    comedyImage.attr("data-animate", results[i].images.fixed_height.url);
                    comedyImage.attr("data-state", "still");
                    comedyImage.addClass("gif");
                    gifDiv.prepend(p);
                    gifDiv.prepend(comedyImage);

                    $(".gif-container").prepend(gifDiv);
                }
            }
        });
})
//function for animating/pausing gifs
//$(document).on("click", ".comedy", renderButtons);
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});

