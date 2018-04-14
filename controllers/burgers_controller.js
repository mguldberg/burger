var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
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

router.post("/api/burger/:burgerName", function (req, res) {
    burger.insertNewBurger(req.params.burgerName, false, function (postResult) {
        // Send back the ID of the new quote
        res.json({ id: postResult.insertId });
    });
});

router.put("/api/burger/:id", function (req, res) {
    console.log("id=", req.params.id);
    console.log(req.body.eaten);
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

// router.delete("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;
