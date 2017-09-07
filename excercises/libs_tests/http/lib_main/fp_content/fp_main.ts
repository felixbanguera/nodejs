/*
Will try to code the main runner for FP processes to webiopi

In this file:

*/

// To communicate through events???
import  *  as fs from 'fs';

import {DeviceHandler} from './fp_device_handler.js';
import {Configs} from './configs.js';
import {SensorsHandler} from './sensors_handler.js';

const deviceHandler = new DeviceHandler();

// Get the devices and config data
var fp_hw = JSON.parse(fs.readFileSync(__dirname+'/fp_hw.json', 'utf8'));

// *****Configure all devices GPIO*****
// *****Save all devices statuses*****
deviceHandler.configure_all_devices(Object.entries(fp_hw));

// Run sensors validations
// ++++ create Class InputHandler
//      ++++++ Intialize with fp_hw config
//      ++++++ Create method Run for interval inputs
//      ++++++ create method notify on change -^ and save

const sensorsHandler = new SensorsHandler();
sensorsHandler.runSensors(Object.entries(fp_hw));
// Subscribe to external events to post to webiopi
//  ++++++ create socket connection config
//  ++++++ create socket_comm lib
//  ++++++ create method: subcribe_to_change_outputs events
//        +++++++ Post depending on data received
//                +++++++ Save new states
deviceHandler.listenToChangeOutput();

// import {SocketComunication} from '../socket_comm_1.js';

// const io = new SocketComunication();

// io.onConnect().subscribe((data) => {
//   console.info("Someone got connectedddddddd");
// });
