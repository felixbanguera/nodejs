import  *  as fs from 'fs';
import {HttpComunication} from './http_comm_1.js';

//const http_com = new HttpComunication();
export class WebIOPi extends HttpComunication{
  constructor(){
    super();
  }
  /* GET */
  getDevice_GPIO(device_info){
    //example::: /devices/mcp1/*
    return this.GET(device_info.conn_info, `/devices/${device_info.hw_id}/*`);
  };
  /* POST */
  setDevice_GPIO_fn(device_info, GPIO_ID: number, in_out: string){
    //example::: /devices/mcp1/0/function/OUT
    var in_out = in_out.toUpperCase();
    return this.POST(device_info.conn_info, `/devices/${device_info.hw_id}/${GPIO_ID}/function/${in_out}`, 'POST', null, {});
  }
  setDevice_GPIO_val(device_info, GPIO_ID: number, val: number): void{
    //example::: /devices/mcp1/0/value/1
    let path = `/devices/${device_info.hw_id}/${GPIO_ID}/value/${val}`;
    console.log(`path::setDevice_GPIO_val:: ${path}`);
    return this.POST(device_info.conn_info, path, 'POST', null, {});
  }

}