import {DeviceHandler} from './fp_device_handler.js';
import { Observable } from "rx";
export class SensorsHandler {
  deviceHanlder;

  constructor() {
    this.deviceHanlder = new DeviceHandler();
  }

  getStatesCompareAndNotify(key, conf_data){
    const inputsStored = this.getStateStored(key);
    this.getStateArrived(conf_data)
    .subscribe(data => {
      this.deviceHanlder.compare_n_notify(key, inputsStored, data);
    }, (error) => {
      console.error(`getStatesCompareAndNotify::ERROR: ${error}`);
    });
  }
  getStateStored(key){
    const pinesStored = this.deviceHanlder.persist.getDevStatusFromFile(key);
    return pinesStored;
  }
  getStateArrived(conf_data){
    return this.deviceHanlder.webiopi.getDevice_GPIO(conf_data)
          .map(({body})=> {
           return JSON.parse(body)
          })
  }

  runSensors(devices){
    devices.map(([key, conf_data]) => {
      const inputsStored = this.getInputs(this.getStateStored(key));
      if(inputsStored.length > 0) {
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