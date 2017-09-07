import  *  as fs from 'fs';
import {Configs} from './configs.js';
export class PersistDevice{
  conf;
  constructor(){
     this.conf = new Configs();
  }
  
  // get device status from file
  getDevStatusFromFile(dev_id){
    let statusData = {}
    if(this.conf.existFilesID.some((id) => id=== dev_id)){
      statusData = JSON.parse(fs.readFileSync(`${__dirname}/devices_status/${dev_id}.json`, 'utf8'));
    }else{
      console.log(`getDevStatusFromFile:: file for device id ${dev_id} don't exist `);
    }
    return statusData;
  }

  save_new_state(dev_id, newData){
    fs.writeFile(`${__dirname}/devices_status/${dev_id}.json`, JSON.stringify(newData, null, 4),
    (err)=> console.log(err));
  }
  
}