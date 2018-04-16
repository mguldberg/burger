// Import the ORM to create functions that will interact with the DB for the burger project.
var orm = require("../config/orm.js");

var burgers_orm = {

    //called from controller for router.get("/", function (req, res) {
    displayAllBurgers: function (callBack) {
        orm.selectAll("burgers", function (res) {
            callBack(res);
        });
    },
    //called from controller for router.post("/api/burger/:burgerName", function (req, res) {
    insertNewBurger: function (burger_name, eatenState, callBack) {
        console.log("in insertNewBurger: " + burger_name + "::" + eatenState);
        orm.insertOneRow("burgers", burger_name, eatenState, function (res) {
            callBack(res);
        });
    },
    //called from controller for router.put("/api/burger/:id", function (req, res) {
    updateOneBurger: function (burger_id, eatenState, callback) {
        console.log("in updateOneBurger: " + burger_id + "::" + eatenState);
        orm.updateOneRow("burgers", "devoured_bool", eatenState, burger_id, function (res) {
            callback(res);
        });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = burgers_orm;