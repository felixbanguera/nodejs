"use strict";
/*
Will try to code the main runner for FP processes to webiopi

In this file:

*/
Object.defineProperty(exports, "__esModule", { value: true });
const fp_device_handler_js_1 = require("./fp_device_handler.js");
const configs_js_1 = require("./configs.js");
const sensors_handler_js_1 = require("./sensors_handler.js");
const deviceHandler = new fp_device_handler_js_1.DeviceHandler();
const sensorsHandler = new sensors_handler_js_1.SensorsHandler();
// Get the devices and config data config
const config = new configs_js_1.Configs();
// *****Configure all devices GPIO*****
// *****Save all devices statuses*****
deviceHandler.configure_all_devices(Object.entries(config.fp_hw));
// Run sensors validations
// ++++ create Class InputHandler
//      ++++++ Intialize with fp_hw config
//      ++++++ Create method Run for interval inputs
//      ++++++ create method notify on change -^ and saves
sensorsHandler.runSensors(Object.entries(config.fp_hw));
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
