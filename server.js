var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

var burger_app = express();

// Serve static content for the app from the "public" directory in the application directory.
burger_app.use(express.static("public"));

// parse application/x-www-form-urlencoded
burger_app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
burger_app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

burger_app.engine("handlebars", exphbs({ defaultLayout: "main" }));
burger_app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

burger_app.use(routes);

// Start our server so that it can begin listening to client requests.
burger_app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
