/*
Will try to code the main runner for FP processes to webiopi

In this file:

*/

// To communicate through events???
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var utils = require('./fp_utils.js');


// Get the devices and config data
var fp_hw = JSON.parse(fs.readFileSync(__dirname+'/fp_hw.json', 'utf8'));

var webiopi = require('../webiopi.js');

// *****Configure all devices GPIO*****
utils.do.configure_all_devices(fp_hw.devices);

// Save all devices statuses
// Run sensors validations

// console.log('In fp_main.js', JSON.stringify(fp_hw));


function basic_callback(status, body){
  console.log(`Response: status code: ${status} and body: ${body}`);
};