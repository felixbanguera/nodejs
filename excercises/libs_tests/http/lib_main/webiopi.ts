import  *  as fs from 'fs';
import {HttpComunication} from './http_comm_1.js';

//const http_com = new HttpComunication();
export class WebIOPi extends HttpComunication{
 private url: string = 'local_webiopi';
  constructor(){
    super();
  }
  /* GET */
  getDevices(callback): void {
    //example::: /devices/*
    var req_get = this.request(this.url, `/devices/*`, null, null, callback);
    req_get.write('');
    req_get.end();
  };
  getDevice_GPIO(device_name: string){
    //example::: /devices/mcp1/*
    return this.GET(this.url, `/devices/${device_name}/*`);
  };

  getDevice_GPIO_val(device_name: string, GPIO_ID: number, callback): void{
    //example::: /devices/mcp1/0/value
    var req_get = this.request(this.url, `/devices/${device_name}/${GPIO_ID}/value`, null, null, callback);
    req_get.write('');
    req_get.end();
  };
  /* POST */
  setDevice_GPIO_fn(device_name: string, GPIO_ID: number, in_out: string){
    //example::: /devices/mcp1/0/function/OUT
    var in_out = in_out.toUpperCase();
    return this.POST(this.url, `/devices/${device_name}/${GPIO_ID}/function/${in_out}`, 'POST', null, {});
  }
  setDevice_GPIO_val(device_name: string, GPIO_ID: number, val: number, callback): void{
    //example::: /devices/mcp1/0/value/1
    let path = `/devices/${device_name}/${GPIO_ID}/value/${val}`;
    console.log(`path:::: ${path}`);
    let req_get = this.request(this.url, path, 'POST', null, callback);
    req_get.write('');
    req_get.end();
  }

}
// // var config = JSON.parse(fs.readFileSync('http_config.json', 'utf8'));

// var get_methods : any = {};
// var post_methods : any = {};

// get_methods.devices = function(callback){
//   //example::: /devices/*
//   var req_get = http_com.request(url, `/devices/*`, null, null, callback);
//   req_get.write('');
//   req_get.end();
// };

// get_methods.device_GPIO = function(device_name, callback){
//   //example::: /devices/mcp1/*
//   var req_get = http_com.request(url, `/devices/${device_name}/*`, null, null, callback);
//   req_get.write('');
//   req_get.end();
// };

// get_methods.device_GPIO_val = function(device_name, GPIO_ID, callback){
//   //example::: /devices/mcp1/0/value
//   var req_get = http_com.request(url, `/devices/${device_name}/${GPIO_ID}/value`, null, null, callback);
//   req_get.write('');
//   req_get.end();
// };

// // get_methods.device_GPIO = function(device_name, callback){
// //  //example::: /devices/mcp1/*
// //   var req_get = http_com.request(url, `/devices/${device_name}/*`, null, null, callback);
// //   req_get.write('');
// //   req_get.end();
// // };

// /*
// This method to define as IN or OUT the function of a I/O pin.
// args:
//   device_name: **The device cofigured in the webiopi lib in the Pi**
//   GPIO_ID: **Then pin number configured in the python script of the webiopi service**
//   in_out: **either IN or OUT, lowercase is also handled**
//   callback: **the callback function to run in the response of the request**
// */
// post_methods.device_GPIO_fn = function(device_name, GPIO_ID, in_out, callback){
//   //example::: /devices/mcp1/0/function/OUT
//   var in_out = in_out.toUpperCase();
//   var req_get = http_com.request(url, `/devices/${device_name}/${GPIO_ID}/function/${in_out}`, 'POST', null, callback);
//   req_get.write('');
//   req_get.end();
// }

// /*
// This method changes the digital value of an OUT I/O pin.
// args:
//   device_name: **The device cofigured in the webiopi lib in the Pi**
//   GPIO_ID: **Then pin number configured in the python script of the webiopi service**
//   val: **either 0 or 1**
//   callback: **the callback function to run in the response of the request**
// */
// post_methods.device_GPIO_val = function(device_name, GPIO_ID, val, callback){
//   //example::: /devices/mcp1/0/value/1
//   let path = `/devices/${device_name}/${GPIO_ID}/value/${val}`;
//   console.log(`path:::: ${path}`);
//   let req_get = http_com.request(url, path, 'POST', null, callback);
//   req_get.write('');
//   req_get.end();
// }
// // To validate the device exists in webiopi configuration saved locally
// function validate_device(){}
// // To validate the GPIO pin is within the device 'planogram'
// function validate_GPIO_in_device(){}
// // To validate the correct function (IN/OUT) in case setting a value
// function validate_GPIO_fn(){}

// function get_header(){}

// exports.get = get_methods;
// exports.send = post_methods;