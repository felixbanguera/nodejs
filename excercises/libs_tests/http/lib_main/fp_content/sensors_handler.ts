import  *  as fs from 'fs';
import {Utils} from './fp_utils.js';
import { Observable } from "rx";
export class SensorsHandler {
  utils;
  intervals: any[] = [];

  constructor() {
    this.utils = new Utils();
  }

  getStatesCompareAndNotify(key, conf_data){
    const inputsStored = this.getStateStored(key);
    this.getStateArrived(conf_data)
    .subscribe(data => {
      this.utils.compare_n_notify(key, inputsStored, data);
    }, (error) => {
      console.error(`getStatesCompareAndNotify::ERROR: ${error}`);
    });
  }
  getStateStored(key){
    const pinesStored = JSON.parse(fs.readFileSync(`${__dirname}/devices_status/${key}.json`, "utf8"));
    return pinesStored;
  }
  getStateArrived(conf_data){
    return this.utils.webiopi.getDevice_GPIO(conf_data)
          .map(({body})=> {
           return JSON.parse(body)
          })
  }

  runSensors(devices){
    devices.map(([key, conf_data]) => {
      const inputsStored = this.getInputs(this.getStateStored(key));
      if(inputsStored) {
        const $interval =  Observable.interval(500);
        $interval.subscribe((x) => {
          this.getStatesCompareAndNotify(key, conf_data);
        },
        function (err) {
            console.log('runSensors >> Error: ' + err);
        },
        function () {
            console.log('runSensors >> Completed');
        });
      }
    });
  }

  getInputs(device){
    return Object.entries(device)
                  .filter(([key,data])=>{
                      return data.function  === "IN"
                    })
  }
}