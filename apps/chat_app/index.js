/*
This translates into the following:

- Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 2).
- We define a route handler / that gets called when we hit our website home.
- We make the http server listen on port 3000.

to make it run: >> node index.js
*/

var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

http.listen(3333, function(){
  console.log('listening on *:3333');
});