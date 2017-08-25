/*
Will try to achieve have several time interval calls to use get requests
  and posts request so they do not interfere with each other and leave
    the main process running
*/
var http = require('http');

var postData = "\{'msg': 'Hello World!'\}";

function create_request(){
  var options = {
    hostname: '10.3.8.109',
    port: 4444,
    path: '/posty',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  return req;
}

var interval1 = setInterval(function(str1, str2) {
  console.log(str1 + " " + str2);
  req = create_request();
  req.write(postData);
  req.end();
}, 10, "Hello.111", "How are you? 111");

var interval2 = setInterval(function(str1, str2) {
  console.log(str1 + " " + str2);
}, 20, "Hello.222", "How are you? 222");

var interval3 = setInterval(function(str1, str2) {
  console.log(str1 + " " + str2);
}, 30, "Hello.333", "How are you? 333");