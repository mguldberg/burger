var connection = require("./connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
var orm = {

  //used to display all of the data in the DB - the correct column is handle upstream from here
  selectAll: function (tableInput, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], function (err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  },

  //called when a user adds a burger to the uneaten list
  insertOneRow: function (tableInput, burger_name, valOfCol, cb) {
    if (valOfCol){
      valOfCol = 1;
    }

    var queryString = "INSERT INTO ?? (burger_name, devoured_bool) VALUES (?, ?)";
    connection.query(queryString, [tableInput, burger_name, valOfCol], function (err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);

    });
  },

  //update 1 row - in this case this is called when the Devour Button is clicked
  updateOneRow: function (tableInput, colToUpdate, valOfCol, searchParm, cb) {
    console.log("before valOfCOl*****"+ valOfCol);
    
    //added to set the value of valOfCol - needed because SQL didn't change the row when 'true'
    if (valOfCol){
      valOfCol = 1;
    }

    console.log("value of valOfCol after :"+ valOfCol);
    var queryString = "UPDATE ?? SET ?? = ? where id=?";
    connection.query(queryString, [tableInput, colToUpdate, valOfCol, searchParm], function (err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);

    });
  },

}

module.exports = orm;
