import  *  as fs from 'fs';
export interface Ihw_config{
  type: string,
  ip: string,
  hw_id: string
}
export const fp_hw: Ihw_config = JSON.parse(fs.readFileSync(__dirname + '/fp_hw.json', 'utf8'));