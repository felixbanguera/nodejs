/*
Will try to code the main runner for FP processes to webiopi

In this file:

*/

// To communicate through events???
var fs = require('fs');
var events = require('events');
var webiopi = require('../webiopi.js');
var utils = require('./fp_utils.js');

var eventEmitter = new events.EventEmitter();

// Get the devices and config data
var fp_hw = JSON.parse(fs.readFileSync(__dirname+'/fp_hw.json', 'utf8'));

// *****Configure all devices GPIO*****
// *****Save all devices statuses*****
utils.do.configure_all_devices(Object.entries(fp_hw.devices)); 


// Run sensors validations
// Subscribe to external events to post to webiopi

function basic_callback(status, body){
  console.log(`Response: status code: ${status} and body: ${body}`);
};