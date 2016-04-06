var express = require('express');
var app = express();
app.use(express.static(__dirname + ''));  
app.use(express.static(__dirname + '/views')); 

var port = 3000;
var server = app.listen(port,function(){
  console.log("We have started our server on port "+port+"!!");
});
var router = express.Router();

app.get('*', function(req, res) {
	res.sendfile('./views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});