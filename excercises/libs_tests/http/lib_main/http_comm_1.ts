import  *  as fs from 'fs';
import * as http from 'http';
interface config{
  ip:string,
  port: number,
  accepts_methods: string[],
  headers?: any
}

export class httpComunication {
  private config : Array<config>;
  public 
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
}


// var methods : any = {};



// methods.http_config = function(){
//   console.log("config", OPTS_WITH_CONF('local_blank_app', '/getty'));
// }

// methods.request = function(conf, path, method, headers, callback){
//   var options = OPTS_WITH_CONF({conf: conf, path: path, method: method});
//   console.log(`:options::: ${JSON.stringify(options)}`);

//   var req = http.request(options, (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     res.setEncoding('utf8');
//     res.on('data', (chunk) => {
//       console.log(`BODY: ${chunk}`);
//       callback(res.statusCode, chunk);
//     });
//     res.on('end', () => {
//       console.log('No more data in response.');
//     });
//   });

//   req.on('error', (e) => {
//     console.error(`problem with request: ${e.message}`);
//   });

//   return req;
// }

// Exporting the methods with the module.exports library???
/*
  module.exports is a Node.js specific feature, it does not work with regular JavaScript
*/
// exports.get = methods;

