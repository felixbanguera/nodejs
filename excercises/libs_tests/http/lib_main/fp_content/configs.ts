import  *  as fs from 'fs';
import  *  as low from 'lowdb/lib/main';
import  *  as FileSync from 'lowdb/adapters/FileSync';

interface hw_config{
  type: string,
  ip: string,
  hw_id: string
}
interface id_config{
  dev_id: string,
  dev_pos: string
}
export class Configs {
  fp_hw:Array<hw_config>;
  fp_id:Array<id_config>;
  mix:any;
  dbConnIDs: any; 
  constructor() {
    this.fp_hw = this.readJson('/fp_hw.json');
    this.mix = this.fp_id = this.readJson('/fp_id.json');
    this.mixx();
    this.setDevIdsExist();
  }

  private mixx(){
    Object.entries(this.fp_id).forEach(([k, v]) => {
      this.mix[k].extra = this.fp_hw[v.dev_id];
    })
  }

  private readJson(URI){
    return JSON.parse(fs.readFileSync(__dirname + URI, 'utf8'));
  }

  private setDevIdsExist(){
    this.dbConnIDs = {};
    Object.entries(this.fp_hw).filter(([key, data])=>{
      return (fs.existsSync(`${__dirname}/devices_status/${key}.json`));
    }).forEach(([key]) => {
      const adapter = new FileSync(`${__dirname}/devices_status/${key}.json`);
      const db= low(adapter);
      this.dbConnIDs[key] = db;
    });
    
  }
}