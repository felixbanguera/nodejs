/*
Will try to code the main util functions to use in FP

In this file:

*/

// To communicate through events???
import  *  as fs from 'fs';
import { WebIOPi }   from '../webiopi.js';
interface ConfigData{
  type: string,
  ip: string,
  hw_id: string
}
export class Utils{
   webiopi;
  constructor(){
    this.webiopi = new WebIOPi()
  }
  configure_all_devices(devices): void{
    console.log(`configure_all_devices with: ${JSON.stringify(devices)}`);
    this.iterateDevicesConfig(devices,this.getPinFuncAndSetupByDevice);
  }
  // To compare statuses
  compare_n_notify(stored, arrived){
    var changed = false;
    Object.entries(stored).forEach(
      ([pos_id, data]) => {
        if(data.function == 'IN' && (data.value != arrived[pos_id].value)) {
          this.notify_in_changed(pos_id, arrived[pos_id].value);
          changed = true;
        }
      }
    );
    //if (changed) this.save_new_state(arrived);
  }

  // To change function of GPIO in webiopi
  change_GPIO_fn(device, GPIO, fn, callback=basic_callback){
    // console.log(`Setting function: ${fn} in ${device}, for GPIO: ${GPIO}`)
    this.webiopi.setDevice_GPIO_fn(device, GPIO, fn, callback);
  }

  // To save statuses in files corresponding to devices
  save_new_state(dev_id, new_json){
    fs.writeFile(`${__dirname}/devices_status/${dev_id}.json`, JSON.stringify(new_json, null, 4),(err)=> console.log(err));
    console.log(`will save new values to ${JSON.stringify(new_json)}`);
  }
  // To notify changes to any sucribed service
  notify_in_changed(pos_id, value){
    console.log(`${pos_id} has different value, changed to ${value}`);
  }

  basic_callback(status, body){
    console.log(`Response: status code: ${status} and body: ${body}`);
  }

  iterateDevicesConfig(devices, callbackPerDevice){
    devices.map(([dev_id, conf_data]) => {
      callbackPerDevice(this,dev_id, conf_data);
    })
  }
   getStatesInHwAndStoredByDevice(_this,dev_id,conf_data){
    this.webiopi.getDevice_GPIO(conf_data.hw_id,function(statusCode, chunk){
      if(statusCode === 200) _this.save_new_state(dev_id, JSON.parse(chunk))
    });
  }
   getPinFuncAndSetupByDevice(_this, dev_id,conf_data ){
    try{
      var fp_hw = JSON.parse(fs.readFileSync(`${__dirname}/devices_status/${dev_id}.json`, 'utf8'));
      Object.entries(fp_hw).forEach(([GPIO, status_data], idx, array) => {
        _this.change_GPIO_fn(conf_data.hw_id, GPIO, status_data.function, function(){
          if(idx === array.length -1){ 
              _this.getStatesInHwAndStoredByDevice(_this,dev_id,conf_data)
          }
        })
      });
    }catch(e){
      // if(e.include?('ENOENT')){
      //   console.log(`The device ${dev_id} doesn't have config`);
      // }else{
        console.log(`\n FP_UTILS::configure_all_devices::${dev_id} - Error>>${e}`);
      // }
    }
  }


}

// var methods : any = {};

// methods.configure_all_devices = function(devices){
//   console.log(`configure_all_devices with: ${JSON.stringify(devices)}`);
//   methods.iterateDevicesConfig(devices,getPinFuncAndSetupByDevice)
// };

// // methods.save_all_state_devices = function(devices){
// //   methods.iterateDevicesConfig(devices, getStatesInHwAndStoredByDevice)
// // };


// // To compare statuses
// methods.compare_n_notify = function(stored, arrived){
//   var changed = false;
//   Object.entries(stored).forEach(
//     ([pos_id, data]) => {
//       if(data.function == 'IN' && (data.value != arrived[pos_id].value)) {
//         methods.notify_in_changed(pos_id, arrived[pos_id].value);
//         changed = true;
//       }
//     }
//   );
//   if(changed) methods.save_new_state(arrived);
// };

// // To change function of GPIO in webiopi
// methods.change_GPIO_fn = function(device, GPIO, fn, callback=basic_callback){
//   // console.log(`Setting function: ${fn} in ${device}, for GPIO: ${GPIO}`)
//   webiopi.send.device_GPIO_fn(device, GPIO, fn, callback);
// }

// // To save statuses in files corresponding to devices
// methods.save_new_state = function(dev_id, new_json){
//   fs.writeFile(`${__dirname}/devices_status/${dev_id}.json`, JSON.stringify(new_json, null, 4));
//   console.log(`will save new values to ${JSON.stringify(new_json)}`);
// };

// // To notify changes to any sucribed service
// methods.notify_in_changed = function(pos_id, value){
//   console.log(`${pos_id} has different value, changed to ${value}`);
// };

// methods.basic_callback = function(status, body){
//   console.log(`Response: status code: ${status} and body: ${body}`);
// };

// methods.iterateDevicesConfig= function(devices, callbackPerDevice){
//   devices.map(([dev_id, conf_data]) => {
//      callbackPerDevice(dev_id, conf_data);
//   })
// }
// function getStatesInHwAndStoredByDevice(dev_id,conf_data){
//   webiopi.get.device_GPIO(conf_data.hw_id,function(statusCode, chunk){
//     if(statusCode === 200) methods.save_new_state(dev_id, JSON.parse(chunk))
//   });
// }
// function getPinFuncAndSetupByDevice(dev_id,conf_data){
//   try{
//     var fp_hw = JSON.parse(fs.readFileSync(`${__dirname}/devices_status/${dev_id}.json`, 'utf8'));
//     Object.entries(fp_hw).forEach(([GPIO, status_data], idx, array) => {
//       methods.change_GPIO_fn(conf_data.hw_id, GPIO, status_data.function, function(){
//         if(idx === array.length -1) getStatesInHwAndStoredByDevice(dev_id,conf_data);
//       })
//     });
//   }catch(e){
//     // if(e.include?('ENOENT')){
//     //   console.log(`The device ${dev_id} doesn't have config`);
//     // }else{
//       console.log(`\n FP_UTILS::configure_all_devices::${dev_id} - Error>>${e}`);
//     // }
//   }
// }
// exports.do = methods;