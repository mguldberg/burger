var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

//call on initial page load (leveraged also on reload in the main.js on the client side) to dump all of the burgers in the DB
router.get("/", function (req, res) {
    burger.displayAllBurgers(function (data) {
        var handlebarsObject = {
            burgers_data: data
        };
        console.log("in route get / ");
        console.log(handlebarsObject);
        res.render("burger", handlebarsObject);
    });
});

//handles adding burger to DB and the screen
router.post("/api/burger/:burgerName", function (req, res) {
    burger.insertNewBurger(req.params.burgerName, false, function (postResult) {
        console.log(postResult);
        return;
    });
});

//called to upate the status of a burger to eaten aka devoured_bool to 'true'
router.put("/api/burger/:id", function (req, res) {
    console.log("id=", req.params.id);
    console.log("EATEN  ::"+req.body.eaten);
    console.log(req.body);

    burger.updateOneBurger(req.params.id, req.body.eaten, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;
