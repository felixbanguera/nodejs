import  *  as fs from 'fs';
import * as http from 'http';
import {RxHttpRequest} from 'rx-http-request';
interface config{
  ip:string,
  port: number,
  accepts_methods: string[],
  headers?: any
}

export class HttpComunication {
  private config : Array<config>;

  constructor(){
    this.config = JSON.parse(fs.readFileSync(__dirname + '/http_config.json', 'utf8'));
  }

  request(conf, path, method, headers, callback){
    const options = this.OptsWithConf({conf, path, method});
    console.log(`:options::: ${JSON.stringify(options)}`);

    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
        callback(res.statusCode, chunk);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    return req;
  }

  protected CreateOptions(host, port, endpoint, method, headers){
    return {
      hostname: host || 80,
      port: port || 80,
      path: endpoint || '/',
      method: method || 'GET',
      headers: headers || {}
    }
  }

  protected OptsWithConf(args){
    const conf : config = this.config[args.conf];
    if(!conf) throw `no valid config param: ${args.conf}`;
    const method : string = args.method ? args.method : '';
    const headers : any  = args.headers ? args.headers : conf.headers;
    return this.CreateOptions(conf.ip, conf.port, args.path, method, headers);
  }
  // This method to return an observable using the rx-http-request from: rx-http-request
  public GET(conf, path){
    const options = this.OptsWithConf({conf: conf, path: path});
    const url = `http://${options.hostname}:${options.port}${options.path}`;
    const options_ = { headers: options.headers }
    const req = RxHttpRequest.get(url, options_);
    return req;
  }

  // This method to return an observable using the rx-http-request from: rx-http-request
  public POST(conf, path, method, headers, body){
    const options = this.OptsWithConf({conf: conf, path: path, method: method});
    const url = `http://${options.hostname}:${options.port}${options.path}`;
    const options_ = {
      body: body,
      json: true // Automatically stringifies the body to JSON
    };
    const req = RxHttpRequest.post(url, options_);
    return req;
  }
}
