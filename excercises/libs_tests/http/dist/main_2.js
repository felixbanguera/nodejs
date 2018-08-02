/*
Will try to achieve have several time interval calls to the weiopi js file
 so they do not interfere with each other and leave the main process running

In this file:
  The call to webiopi.js
  mock data
  sample calls
  and final calls Using the webiopi.js file
*/
// To communicate through events???
var events = require('events');
var eventEmitter = new events.EventEmitter();
var webiopi = require('./webiopi.js');
/*
// The following to change 0 position LED depending on 7th position IN using eventEmitter
var interval1 = setInterval(function() {
  console.log(`webiopi.send.device_GPIO_val`);
  webiopi.get.device_GPIO_val('mcp1', 7, emit_event)
}, 100);

function emit_event(status, body){
  eventEmitter.emit('change_val', body);
}

eventEmitter.on('change_val', function(val){
  webiopi.send.device_GPIO_val('mcp1', 0, val, basic_callback)
})
*/
/*
// The following to change 0 position LED depending on 7th position IN directly
var interval1 = setInterval(function() {
  console.log(`webiopi.send.device_GPIO_val`);
  webiopi.get.device_GPIO_val('mcp1', 7, change_val)
}, 100);

function change_val(status, body){
  webiopi.send.device_GPIO_val('mcp1', 1, body, basic_callback)
}
*/
/*
// The following to get the mcp1 GPIO using the interval
var interval1 = setInterval(function(str1, str2) {
  console.log(str1 + " " + str2);
  webiopi.get.device_GPIO('mcp1', basic_callback)
}, 100, "Hello.111", "How are you? 111");
*/
/*
// The following to toggle a Value from the time interval
var valy = 1;
var interval1 = setInterval(function() {
  valy === 0 ? valy = 1 : valy =0;
  console.log(`webiopi.send.device_GPIO_val, valy: ${valy}`);
  try{
    webiopi.send.device_GPIO_val('mcp1', 0, valy, basic_callback)
  }catch(e){
    console.log(`error: ${e}`);
  }
}, 1000);
*/
// function basic_callback(status, body){
//   console.log(`Response: status code: ${status} and body: ${body}`);
// }; 
