var mysql = require('mysql');
var inquirer = require("inquirer");
var fs = require("fs");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dexter11342',
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
afterConnection();
//query callback

function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw "yikes";

    console.log(res);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which Product Would You Like To Choose?",
          name: "Shopping Cart",
          choices: ["DYE M3+", "DYE DSR", "DYE NT11",
            "Planet Eclipse CS1", "Planet Eclipse CS2",
            "Empire Axe Pro", "Empire Vanquish 1.5", "Empire Vanquish 2.0",
            "Bob Long Ripper", "Bob Long G6R"]
        }
      ])
      .then(answers => {
        var product = answers["Shopping Cart"];
        
        connection.query("SELECT stock_quantity FROM products WHERE ?", {product_name: product}, function (err, res) {
          if (err) throw (err);
          inquirer
          .prompt([
            {
              type: 'input',
              message: "How many Would you like to purchase? We have " + res[0].stock_quantity +
                " left in stock!",
                name: "whatever"
            }
          ])
          .then(answers => {
            console.log(answers);
            productLeft();
          })
        });
        
      });
  })
}
function productLeft() {
  connection.query("SELECT stock_quantity FROM products", function (err, res) {
    if (err) throw "yikes";
    console.log(res);
  });
}
//killing the connection 

function killconnection() {
  console.log("killing connection.");
  connection.end();
};
