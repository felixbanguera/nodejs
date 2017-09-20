// import  *  as fs from 'fs';
// import * as http from 'http';
// import {RxHttpRequest} from 'rx-http-request';
import 'reflect-metadata'

export class ClassToTest {

  constructor(){
    //  To be used to test private functions
    Reflect.defineMetadata("private_method", this.private_method, ClassToTest.prototype, "private_method");
  }

  private fn_returns_obj(args){
    return {
      hostname: args.host || 80,
      port: args.port || 80,
      path: args.endpoint || '/',
      method: args.method || 'GET',
      headers: args.headers || {}
    }
  }

  // @Reflect.metadata("meta_test", this.method)
  private private_method() {
    return {"data": "reflected"};
  }

  public fn_returns_other_fn_result(args){
    return this.fn_returns_obj(args);
  }
  // This method to return an observable using the rx-http-request from: rx-http-request
  public fn_returns_observable(conf, path){
    const options = this.fn_returns_other_fn_result({conf: conf, path: path});
    const url = `http://${options.hostname}:${options.port}${options.path}`;
    const options_ = { headers: options.headers }
    // const req = RxHttpRequest.get(url, options_);
    // return req.timeout(this.TIMEOUT);
  }


}