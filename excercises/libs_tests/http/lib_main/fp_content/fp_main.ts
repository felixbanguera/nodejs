/*
Will try to code the main runner for FP processes to webiopi

In this file:

*/

// To communicate through events???
import  *  as fs from 'fs';

import {Utils} from './fp_utils.js';
import {Configs} from './configs.js';

const test = new Configs();

const utils = new Utils();

// Get the devices and config data
var fp_hw = JSON.parse(fs.readFileSync(__dirname+'/fp_hw.json', 'utf8'));

// *****Configure all devices GPIO*****
// *****Save all devices statuses*****
utils.configure_all_devices(Object.entries(fp_hw));


// Run sensors validations
// Subscribe to external events to post to webiopi

// function basic_callback(status, body){
//   console.log(`Response: status code: ${status} and body: ${body}`);
// };