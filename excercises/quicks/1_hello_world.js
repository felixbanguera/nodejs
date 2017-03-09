var http = require("http");

http.createServer(function(request, response){
  // 1. Send the HTTP header
  // 2. HTTP statue 200 : OK
  // 3. Set Content Type: text/plain
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });


  // Send the response body as "Hello World Felix"
  response.end('Hello World Felix!\n');

}).listen(8081);

// Console will print the msg
console.log('Server running at FLX`s http://127.0.0.1:8081');
