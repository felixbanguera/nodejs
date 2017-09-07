/*
Will try to code the main util functions to use in FP

In this file:

*/

// To communicate through events???
import  *  as fs from 'fs';
import { WebIOPi }   from '../webiopi.js';
import {SocketComunication} from '../socket_comm_1.js';
import {Configs} from './configs.js';

interface ConfigData{
  type: string,
  ip: string,
  hw_id: string
}
interface output{
  tr_id:string,
  value:Number
}
export class DeviceHandler{
   webiopi; io; conf;
  constructor(){
    this.webiopi = new WebIOPi()
    this.io = new SocketComunication();
    this.conf = new Configs().mix;
  }
  // To start configuring all devices
  configure_all_devices(devices): void{
    console.log(`configure_all_devices with: ${JSON.stringify(devices)}`);
    devices.map(([dev_id, conf_data]) => {
      this.getPinFuncAndSetupByDevice(dev_id, conf_data);
    });
  }
  // To compare statuses
  compare_n_notify(dev_id,stored, arrived){;
    let changed = false;
    Object.entries(stored).forEach(
      ([pos_id, data]) => {
        if(data.function == 'IN' && (data.value != arrived[pos_id].value)) {
          this.notify_in_changed(pos_id, arrived[pos_id].value);
          changed = true;
        }
      }
    );
    if (changed) this.save_new_state(dev_id,arrived);
  }

  // To change function of GPIO in webiopi
  change_GPIO_fn(device_info, GPIO, fn){
    return this.webiopi.setDevice_GPIO_fn(device_info, GPIO, fn);
  }

  // To save statuses in files corresponding to devices
  save_new_state(dev_id, new_json){
    fs.writeFile(`${__dirname}/devices_status/${dev_id}.json`, JSON.stringify(new_json, null, 4),(err)=> console.log(err));
  }
  // To notify changes to any sucribed service
  notify_in_changed(pos_id, value){
    console.log(`${pos_id} has different value, changed to ${value}`);
  }

  getStatesInHwAndStoredByDevice(dev_id,conf_data){
    this.webiopi.getDevice_GPIO(conf_data)
    .subscribe((data) => {
      if(data.response.statusCode === 200) this.save_new_state(dev_id, JSON.parse(data.response.body))
    },(error) => {
      console.error(`getStatesInHwAndStoredByDevice::ERROR: ${error}`);
    });
  }

  getPinFuncAndSetupByDevice(dev_id,conf_data ){
    try{
      var fp_hw = JSON.parse(fs.readFileSync(`${__dirname}/devices_status/${dev_id}.json`, 'utf8'));
      Object.entries(fp_hw).forEach(([GPIO, status_data], idx, array) => {
        this.change_GPIO_fn(conf_data, GPIO, status_data.function)
        .subscribe((data_resp) => {
          if(data_resp.body !== status_data.function){
            console.info(`In Device ${conf_data.hw_id} and pin ${GPIO} Something went wrong: ${JSON.stringify(data_resp)}`);
          }
          if(idx === array.length -1){
            this.getStatesInHwAndStoredByDevice(dev_id,conf_data)
          }
        },(error) => {
          console.error(`getPinFuncAndSetupByDevice::ERROR: ${error}`);
        });
      });
    }catch(e){
      // if(e.include?('ENOENT')){
      //   console.log(`The device ${dev_id} doesn't have config`);
      // }else{
        console.log(`\n FP_DEVICE_HANDLER::configure_all_devices::${dev_id} - Error>>${e}`);
      // }
    }
  }
  // get device status from file
  getDevStatusFromFile(dev_id){
    return JSON.parse(fs.readFileSync(`${__dirname}/devices_status/${dev_id}.json`, 'utf8'));
  }

  // data should come as a stringified JSON
  onChangeOutput(data){
    const {tr_id, value}:output = JSON.parse(data);
    const dev_conf = this.conf[tr_id];
    const id_conf = dev_conf ? this.getDevStatusFromFile(dev_conf.dev_id)[tr_id] : {};
    if(id_conf.function === "OUT"){
      this.webiopi.setDevice_GPIO_val(dev_conf.extra, dev_conf.dev_pos, value)
      .subscribe((data) => {
        let data_resp = data.response;
        if(data_resp.body === value && data_resp.statusCode === 200){
          console.info(`Value changed to: ${value}`);
        }else{
          console.info(`Something went wrong: ${JSON.stringify(data_resp)}`);
        }
      }, (error) => {
        console.error(`onChangeOutput::ERROR: ${error}`);
      });
    }else{
      console.log(`onChangeOutput:::Something wrong: ${tr_id} - ${ value} - ${dev_conf}`);
    }
  }

  // To subscribe to change outputs events
  listenToChangeOutput(){
    this.io.onEvent('chat-message')
    .subscribe((data) => {
      this.onChangeOutput(data)
    }, (error) => {
      console.error(`onChangeOutput::ERROR: ${error}`);
    });
  }
}