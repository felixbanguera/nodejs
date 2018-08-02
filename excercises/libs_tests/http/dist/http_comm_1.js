"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const http = require("http");
const rx_http_request_1 = require("rx-http-request");
class HttpComunication {
    constructor() {
        this.TIMEOUT = 5000;
        this.config = JSON.parse(fs.readFileSync(__dirname + '/http_config.json', 'utf8'));
    }
    request(conf, path, method, headers, callback) {
        const options = this.OptsWithConf({ conf, path, method });
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
    CreateOptions(host, port, endpoint, method, headers) {
        return {
            hostname: host || 80,
            port: port || 80,
            path: endpoint || '/',
            method: method || 'GET',
            headers: headers || {}
        };
    }
    OptsWithConf(args) {
        const conf = this.config[args.conf];
        if (!conf)
            throw `no valid config param: ${args.conf}`;
        const method = args.method ? args.method : '';
        const headers = args.headers ? args.headers : conf.headers;
        return this.CreateOptions(conf.ip, conf.port, args.path, method, headers);
    }
    // This method to return an observable using the rx-http-request from: rx-http-request
    GET(conf, path) {
        const options = this.OptsWithConf({ conf: conf, path: path });
        const url = `http://${options.hostname}:${options.port}${options.path}`;
        const options_ = { headers: options.headers };
        const req = rx_http_request_1.RxHttpRequest.get(url, options_);
        return req.timeout(this.TIMEOUT);
    }
    // This method to return an observable using the rx-http-request from: rx-http-request
    POST(conf, path, method, headers, body) {
        const options = this.OptsWithConf({ conf: conf, path: path, method: method });
        const url = `http://${options.hostname}:${options.port}${options.path}`;
        const options_ = {
            body: body,
            json: true,
            headers: options.headers
        };
        const req = rx_http_request_1.RxHttpRequest.post(url, options_);
        return req.timeout(this.TIMEOUT);
    }
}
exports.HttpComunication = HttpComunication;
