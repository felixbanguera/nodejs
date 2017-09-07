import  *  as fs from 'fs';
import {Configs} from './configs.js';
export class PersistDevice{
  conf;
  constructor(){
     this.conf = new Configs();
  }
  
  // get device status from file
  getDevStatusFromFile(dev_id){
    console.log(`getDevStatusFromFile:: dev_id ${dev_id}`);
    let statusData = {}
    if(this.conf.existFilesID.some((id) => id=== dev_id)){
      statusData = JSON.parse(fs.readFileSync(`${__dirname}/devices_status/${dev_id}.json`, 'utf8'));
    }
    return statusData;
  }

  save_new_state(dev_id, newData){
    fs.writeFile(`${__dirname}/devices_status/${dev_id}.json`, JSON.stringify(newData, null, 4),
    (err)=> console.log(err));
  }
  
}