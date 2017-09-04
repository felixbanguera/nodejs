var fs = require('fs');
var http = require('http');
var config = JSON.parse(fs.readFileSync('http_config.json', 'utf8'));

var methods = {};

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
// This method creates a request and uses a callback parameter to execute on('data')
methods.request_with_callback = function(conf, path, method, headers, callback){
  var options = OPTS_WITH_CONF({conf: conf, path: path, method: method});
  var req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
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

// This method creates a request and uses a RX.subject parameter to execute on('data')
methods.request_with_subject = function(conf, path, method, headers, subject){
  var options = OPTS_WITH_CONF({conf: conf, path: path, method: method});
  var req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      subject.onNext({status: res.statusCode, body: chunk});
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

// This method to return an observable using the rx_http lib from: https://github.com/Reactive-Extensions/rxjs-node
// ------- THIS one is NOT working "!!!"- - ---
const rx_http = require('./rxjs-node-master/lib/rx_http.js');
methods.observable_request = function(conf, path, method, headers){
  var options = OPTS_WITH_CONF({conf: conf, path: path, method: method});
  var req = rx_http.get(options);
  console.log(`http_com::observable_request:: req: ${req}`);
  return req;
}

// This method to return an observable using the rx-http-request from: rx-http-request
const util = require('util');
const rxhttpreq = require('rx-http-request').RxHttpRequest;
methods.RxHtt_observable_request = function(conf, path, method, headers){
  var options = OPTS_WITH_CONF({conf: conf, path: path, method: method});
  let url = `http://${options.hostname}:${options.port}${options.path}`;
  console.log(`URRRRLLLLL: ${url}`);
  const options_ = {
      body: {
          some: 'payload'
      },
      json: true // Automatically stringifies the body to JSON
  };
  let mthd = options.method.toUpperCase();
  switch(mthd) {
    case 'GET':
      var req = rxhttpreq.get(url);
      break;
    case 'POST':
      var req = rxhttpreq.post(url, options_);
      break;
    default:
      throw "Not defined Method"
  }

  return req;
}

// Exporting the methods with the module.exports library???
/*
  module.exports is a Node.js specific feature, it does not work with regular JavaScript
*/
exports.get = methods;
