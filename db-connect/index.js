const express = require('express')
const app = express()
var bodyParser = require('body-parser');

mysql = require('mysql')
var connection = mysql.createConnection({
  host     : '172.21.170.15',
  user     : 'sybca',
  password : 'sybca',
  database : 'sybca'
});


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.get('/', function (req, res) {
  connection.connect();
  connection.query('SELECT * FROM user', function (err, rows, fields) {
    if (err){
      console.log(err);
     res.json ("Err encountered");

    } else if(rows.length > 0){
    	console.log('The username is : ', rows[0].display_name)
      res.json(rows[0]);
    } else {
      res.json ("No Records");
    }
  });

  connection.end()

})


app.listen(8000, function(){
	console.log("My master, Your command is my wish, i am all ears at 8000:")
})
