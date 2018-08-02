const fs = require('fs');
const http = require('http');
const config = JSON.parse(fs.readFileSync('http_config.json', 'utf8'));
const util = require('util');
const rxhttpreq = require('rx-http-request').RxHttpRequest;

function CREATE_OPTIONS(host, port, endpoint, method, headers){
  return {
    hostname: host || 'localhost',
    port: port || 80,
    path: endpoint || '/',
    method: method || 'GET',
    headers: headers || {}
  }
}

function OPTS_WITH_CONF(args){
  let conf = config[args.conf];
  if(!conf) throw `no valid config param: ${args.conf}`;
  let method = args.method ? args.method : conf.method;
  let headers = args.headers ? args.headers : conf.headers;
  return CREATE_OPTIONS(conf.ip, conf.port, args.path, method, headers);
}

// This method to return an observable using the rx-http-request from: rx-http-request
function RxHtt_observable_get(conf, path, method, headers){
  let options = OPTS_WITH_CONF({conf: conf, path: path, method: method});
  let url = `http://${options.hostname}:${options.port}${options.path}`;
  console.log(`URRRRLLLLL: ${url}`);
  let req = rxhttpreq.get(url);
  return req;
}

// This method to return an observable using the rx-http-request from: rx-http-request
function RxHtt_observable_post(conf, path, method, headers, body){
  let options = OPTS_WITH_CONF({conf: conf, path: path, method: method});
  let url = `http://${options.hostname}:${options.port}${options.path}`;
  console.log(`URRRRLLLLL: ${url}`);
  const options_ = {
    body: body,
    json: true // Automatically stringifies the body to JSON
  };
  let req = rxhttpreq.post(url, options_);
  return req;
}

// Exporting the methods with the module.exports library???
/*
  module.exports is a Node.js specific feature, it does not work with regular JavaScript
*/
exports.get = RxHtt_observable_get;
exports.post = RxHtt_observable_post;
