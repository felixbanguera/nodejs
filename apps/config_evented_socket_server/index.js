/*
Will read a json confihg file to initialize events
and redirect them.
*/
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

console.log("config", config.events);

io.on('connection', function(socket){
  console.log('A user connected????');
  config.events.forEach(function(event){
    console.log("will initialize event:", event);
    socket.on(event, function(data){
      console.log('message: ' + data);
      io.emit(event, data);
    });
  });


  // // send the message to everyone, including the sender.
  socket.on('disconnect', function(){
    console.log('A user disconnected');
  });
});

http.listen(3333, function(){
  console.log('Listening on *:3333');
});