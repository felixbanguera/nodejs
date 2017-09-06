import  *  as fs from 'fs';
import {Utils} from './fp_utils.js';
import { Observable } from "rx";
export class SensorsHandler {
  utils;
  intervals: any[] = [];

  constructor() {
    this.utils = new Utils();
  }

  getStatesCompareAndNotify(key, $pinArrived, pinesStored) {
     $pinArrived
      .subscribe(data => {
        this.utils.compare_n_notify(key, pinesStored, data);
      });
  }
  getStateStored(key){
    const pinesStored = JSON.parse(fs.readFileSync(`${__dirname}/devices_status/${key}.json`, "utf8"));
    return this.getInputs(pinesStored)
  }
  getStateArrived(conf_data){
    console.log('body', conf_data.hw_id)
   return this.utils.webiopi.getDevice_GPIO(conf_data.hw_id)
          .flatMap(({body})=> {
             console.log('body', body);
           return this.getInputs(JSON.parse(body))
          })
  }
  // runSensors(devices) {
  //   devices.map(([key, conf_data]) => {
  //     const inputsStored= this.getStateStored(key)
  //     if(inputsStored) {
  //       const $pinArrived = this.getStateArrived(conf_data)
  //       this.intervals.push(
  //         setInterval(() => {
  //           this.getStatesCompareAndNotify(key,$pinArrived, inputsStored);
  //         }, 1000)
  //       );
  //     }
  //   });
  // }
  runSensors(devices){
   const $interval =  Observable.interval(500).flatMap((x) => {
      const a= {hw_id:"mcp1"}
      return  this.getStateArrived(a)
   });
   var subscription = $interval.subscribe(
     (x) => {
        console.log('Next: ' + JSON.stringify(x));
      this.prueba(x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });
  }
  prueba(x){
    this.intervals.push(x);
    console.log('intervals',this.intervals);
  }
  getInputs(device){
    return Object.entries(device)
                  .filter(([key,data])=>{ 
                      return data.function || data.functiond === "IN"
                    })
  }
}