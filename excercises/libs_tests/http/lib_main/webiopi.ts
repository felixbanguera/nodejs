var fs = require('fs');
var http_com = require('./http_comm_1.js');

// var config = JSON.parse(fs.readFileSync('http_config.json', 'utf8'));
const url = 'local_webiopi';
var get_methods : any = {};
var post_methods : any = {};

get_methods.devices = function(callback){
  //example::: /devices/*
  var req_get = http_com.get.request(url, `/devices/*`, null, null, callback);
  req_get.write('');
  req_get.end();
};

get_methods.device_GPIO = function(device_name, callback){
  //example::: /devices/mcp1/*
  var req_get = http_com.get.request(url, `/devices/${device_name}/*`, null, null, callback);
  req_get.write('');
  req_get.end();
};

get_methods.device_GPIO_val = function(device_name, GPIO_ID, callback){
  //example::: /devices/mcp1/0/value
  var req_get = http_com.get.request(url, `/devices/${device_name}/${GPIO_ID}/value`, null, null, callback);
  req_get.write('');
  req_get.end();
};

// get_methods.device_GPIO = function(device_name, callback){
//  //example::: /devices/mcp1/*
//   var req_get = http_com.get.request(url, `/devices/${device_name}/*`, null, null, callback);
//   req_get.write('');
//   req_get.end();
// };

/*
This method to define as IN or OUT the function of a I/O pin.
args:
  device_name: **The device cofigured in the webiopi lib in the Pi**
  GPIO_ID: **Then pin number configured in the python script of the webiopi service**
  in_out: **either IN or OUT, lowercase is also handled**
  callback: **the callback function to run in the response of the request**
*/
post_methods.device_GPIO_fn = function(device_name, GPIO_ID, in_out, callback){
  //example::: /devices/mcp1/0/function/OUT
  var in_out = in_out.toUpperCase();
  var req_get = http_com.get.request(url, `/devices/${device_name}/${GPIO_ID}/function/${in_out}`, 'POST', null, callback);
  req_get.write('');
  req_get.end();
}

/*
This method changes the digital value of an OUT I/O pin.
args:
  device_name: **The device cofigured in the webiopi lib in the Pi**
  GPIO_ID: **Then pin number configured in the python script of the webiopi service**
  val: **either 0 or 1**
  callback: **the callback function to run in the response of the request**
*/
post_methods.device_GPIO_val = function(device_name, GPIO_ID, val, callback){
  //example::: /devices/mcp1/0/value/1
  let path = `/devices/${device_name}/${GPIO_ID}/value/${val}`;
  console.log(`path:::: ${path}`);
  let req_get = http_com.get.request(url, path, 'POST', null, callback);
  req_get.write('');
  req_get.end();
}
// To validate the device exists in webiopi configuration saved locally
function validate_device(){}
// To validate the GPIO pin is within the device 'planogram'
function validate_GPIO_in_device(){}
// To validate the correct function (IN/OUT) in case setting a value
function validate_GPIO_fn(){}

function get_header(){}

exports.get = get_methods;
exports.send = post_methods;