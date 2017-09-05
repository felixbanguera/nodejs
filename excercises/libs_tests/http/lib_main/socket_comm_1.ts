import  *  as fs from 'fs';
import  *  as io from 'socket.io-client';
interface config{
  ip:string,
  port: number
}

export class SocketComunication {
  private config : Array<config>;
  public io_obj:any;
  private site:string = "local_socket_server";
  constructor(){
    this.config = JSON.parse(fs.readFileSync(__dirname + '/socket_config.json', 'utf8'))[this.site];
    this.io_obj = this.create_io();
  }

  private create_io(){
    return io(`${this.config.ip}:${this.config.port}`);
  }
}
