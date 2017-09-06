import  *  as fs from 'fs';
import { Observable } from 'rxjs/Observable';
import  *  as io from 'socket.io-client';
interface config{
  ip:string,
  port:number
}

export class SocketComunication {
  private config : config;
  private socket:any;
  private site:string = "local_socket_server";
  constructor(){
    this.config = JSON.parse(fs.readFileSync(__dirname + '/socket_config.json', 'utf8'))[this.site];
    this.socket = this.create_io();
    console.log(`SocketComunication:config: ${JSON.stringify(this.config)}`);
  }

  private create_io(){
    const url = `http://${this.config.ip}:${this.config.port}`;
    console.info(`yyyyyyyyy The url for socket: ${url}`);
    return io(url);
  }

  public onConnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('connect', () => observer.next());
    });
  }

  public onDisconnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('disconnect', () => observer.next());
    });
  }

  public send(event:string,data:any): void {
    this.socket.emit(event, data);
  }

  public onEvent(event:string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }
}