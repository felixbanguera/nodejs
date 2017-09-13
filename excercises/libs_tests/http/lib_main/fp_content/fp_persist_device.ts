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
    if(Object.entries(this.conf.dbConnIDs).some(([devId, configData]) => devId === dev_id)){
      statusData =  this.conf.dbConnIDs[dev_id] && this.conf.dbConnIDs[dev_id].getState();
    }else{
      console.log(`getDevAllStatus:: file for device id ${dev_id} don't exist `);
    }
    return statusData;
  }

  save_new_state(dev_id, newData){
    this.conf.dbConnIDs[dev_id] && this.conf.dbConnIDs[dev_id].setState(newData).write();
  }
  save_change_pin(dev_id, pin, value){
    this.conf.dbConnIDs[dev_id] && this.conf.dbConnIDs[dev_id].set(`${pin}.value`, value ).write();
  }
}