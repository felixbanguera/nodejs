/*
Will try to achieve to run a main fp script and test with it configuration possibilities

In this file:
  The call to fp_main.js
  mock data
  sample calls
  and final calls Using the fp_main.js
*/

// To communicate through events???
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var webiopi = require('./fp_content/fp_main.js');

function basic_callback(status, body){
  console.log(`Response: status code: ${status} and body: ${body}`);
};