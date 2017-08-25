/*
Will try to achieve have several time interval calls to use get requests
  and posts request so they do not interfere with each other and leave
    the main process running

In this file:
  The call to the custome libs to be used
  mock data
  sample calls
  and final calls Using the http_comm_1.js file
*/

var http_com = require('./http_comm_1.js');

var postData = "\{'msg': 'Hello World!'\}";

var interval1 = setInterval(function(str1, str2) {
  console.log(str1 + " " + str2);
  var req_get = http_com.get.request('local_blank_app', '/getty', null, null, basic_callback);
  req_get.write(postData);
  req_get.end();
}, 100, "Hello.111", "How are you? 111");

var interval2 = setInterval(function(str1, str2) {
  console.log(str1 + " " + str2);
  var req_get = http_com.get.request('local_blank_app', '/getty', null, null, basic_callback);
  req_get.write(postData);
  req_get.end();
}, 100, "Hello.222", "How are you? 222");

var interval3 = setInterval(function(str1, str2) {
  console.log(str1 + " " + str2);
  var req_post = http_com.get.request('local_blank_app', '/posty', 'POST', null, basic_callback);
  var what = req_post.write(postData);
  console.log(`what: ${what}`);
  req_post.end();
}, 300, "Hello.333", "How are you? 333");

function basic_callback(status, body){
  console.log(`Response: status code: ${status} and body: ${body}`);
};