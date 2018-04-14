var connection = require("./connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
var orm = {
  selectAll: function (tableInput, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], function (err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);
    });
  },

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

  updateOneRow: function (tableInput, colToUpdate, valOfCol, searchParm, cb) {
    if (valOfCol){
      valOfCol = 1;
    }
    console.log("value of valOfCol :"+ valOfCol);
    var queryString = "UPDATE ?? SET ?? = ? where id=?";
    console.log(queryString);
    connection.query(queryString, [tableInput, colToUpdate, valOfCol, searchParm], function (err, result) {
      if (err) throw err;
      console.log(result);
      cb(result);

    });
  },

}

module.exports = orm;
