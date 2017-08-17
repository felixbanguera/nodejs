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

// data received from a configured event will have the form of
// {"event": "chat-message", "info":"some text or object info"}
// in order to receive and redirect all events wanted from external apps
io.on('connection', function(socket){
  console.log('A connection  on socket server');
  config.events.forEach(function(event){
    console.log("will initialize event:", event);
    socket.on(event, function(data){
      console.log('message: ' + data);
      if(data.event){
        io.emit(data.event, data.info);
      }else{
        io.emit(event, data);
      }
    });
  });


  // // send the message to everyone, including the sender.
  socket.on('disconnect', function(){
    console.log('A user disconnected');
  });
});

http.listen(1111, function(){
  console.log('Listening on *:1111');
});