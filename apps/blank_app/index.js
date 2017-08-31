
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/getty', function(req, res){
  console.log('Inside get call in Node server...');
  res.end("{'a':123}");
});

app.post('/posty', function(req, res){
  console.log('Inside post call in Node server...');
  res.end("HOla posty!");
});

http.listen(4444, function(){
  console.log('Listening on *:4444');
});