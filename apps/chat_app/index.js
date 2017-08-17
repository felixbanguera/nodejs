/*
This translates into the following:

- Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 2).
- We define a route handler / that gets called when we hit our website home.
- We make the http server listen on port 3000.

******
- Notice that I initialize a new instance of socket.io by passing the http (the HTTP server) object.
- Then I listen on the connection event for incoming sockets, and I log it to the console.

to make it run: >> node index.js
*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', function(socket){
//   console.log('A user connected????');
//   socket.on('chat-message', function(msg){
//     console.log('message: ' + msg);
//     io.emit('chat-message', msg);
//   });

//   // send the message to everyone, including the sender.
//   socket.on('disconnect', function(){
//     console.log('A user disconnected');
//   });
// });

http.listen(2222, function(){
  console.log('Listening on *:2222');
});