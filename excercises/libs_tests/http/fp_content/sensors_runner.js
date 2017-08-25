/*
Will try to code only the sensors/inputs runner to be aware of changes

In this file:

*/

// To communicate through events???
var events = require('events');
var eventEmitter = new events.EventEmitter();

var webiopi = require('../webiopi.js');


function basic_callback(status, body){
  console.log(`Response: status code: ${status} and body: ${body}`);
};