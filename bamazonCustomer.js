var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Dexter11342',
  database:"bamazon"
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
afterConnection();
  //query callback
  
 function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res){
      if (err) throw "yikes";
  
      console.log(res);
    })
  }
  
  //killing the connection 
  
 // function killconnection() {
 //   console.log("killing connection.");
 //   connection.end();
 // };
  