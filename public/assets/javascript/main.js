//Winning music
var audioWinning = document.createElement("audio");
audioWinning.setAttribute("src", "assets/img/tasty_burger.wav");

audioWinning.play();

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
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

    //   $(".delete-cat").on("click", function(event) {
    //     var id = $(this).data("id");

    //     // Send the DELETE request.
    //     $.ajax("/api/cats/" + id, {
    //       type: "DELETE"
    //     }).then(
    //       function() {
    //         console.log("deleted cat", id);
    //         // Reload the page to get the updated list
    //         location.reload();
    //       }
    //     );
    //   });
});
