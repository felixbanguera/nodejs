import  *  as fs from 'fs';
import {Configs} from './configs.js';
export class PersistDevice{
  conf;
  constructor(){
     this.conf = new Configs();
  }
  
  // get device all  status from file
  getDevAllStatus(dev_id){
    let statusData = {}
    if(Object.entries(this.conf.existFilesID).some(([devId, configData]) => devId === dev_id)){

      statusData =  this.conf.existFilesID[dev_id].getState();
    }else{
      console.log(`getDevAllStatus:: file for device id ${dev_id} don't exist `);
    }
    return statusData;
  }

  save_new_state(dev_id, newData){
    console.log('save_new_state');
    this.conf.existFilesID[dev_id].setState(newData).write();
    // fs.writeFile(`${__dirname}/devices_status/${dev_id}.json`, JSON.stringify(newData, null, 4),
    // (err)=> console.log(err));
  }
  
}