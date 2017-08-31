var fs = require('fs');
var http = require('http');
var config = JSON.parse(fs.readFileSync('http_config.json', 'utf8'));

var methods = {};

function CREATE_OPTIONS(host, port, endpoint, method, headers){
  return {
    hostname: host || 80,
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

// Exporting the methods with the module.exports library???
/*
  module.exports is a Node.js specific feature, it does not work with regular JavaScript
*/
exports.get = methods;
