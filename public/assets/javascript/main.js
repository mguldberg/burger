//Fun sounder for each page load - from Pulp Fiction - S. L Jackson
var audioWinning = document.createElement("audio");
audioWinning.setAttribute("src", "assets/img/tasty_burger.wav");

audioWinning.play();

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

    //handle Devoured button click - will move button to the other side of the screen once the DB is updated
    $(".devoured-button").on("click", function (event) {
        var id = $(this).attr("burger-id");
        console.log($(this).attr("burger-id"));

        var newEatenState = {
            eaten: true
        };

        // Send the PUT request.
        $.ajax("/api/burger/" + id, {
            type: "PUT",
            data: newEatenState,
        }).then(
            function () {
                console.log("changed burger devoured state to", newEatenState.eaten);
                // Reload the page to get the updated list
                location.reload();
            });
    });

    //add new burger handler
    $(".create-burger-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurgerName = $("#burger-name").val().trim();

        console.log("inside create burger");
        console.log(newBurgerName);

        // Send the POST request.
        $.ajax("/api/burger/" + newBurgerName, {
            type: "POST",
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
            );
    });

});
