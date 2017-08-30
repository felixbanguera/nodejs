var fs = require('fs');
var http = require('http');
var config = JSON.parse(fs.readFileSync(__dirname + '/http_config.json', 'utf8'));

var methods : any = {};

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

// methods.http_config = function(){
//   console.log("config", OPTS_WITH_CONF('local_blank_app', '/getty'));
// }

methods.request = function(conf, path, method, headers, callback){
  var options = OPTS_WITH_CONF({conf: conf, path: path, method: method});
  console.log(`:options::: ${JSON.stringify(options)}`);

  var req = http.request(options, (res) => {
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

// Exporting the methods with the module.exports library???
/*
  module.exports is a Node.js specific feature, it does not work with regular JavaScript
*/
exports.get = methods;

