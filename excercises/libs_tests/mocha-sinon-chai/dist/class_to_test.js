"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import  *  as fs from 'fs';
// import * as http from 'http';
// import {RxHttpRequest} from 'rx-http-request';
require("reflect-metadata");
class ClassToTest {
    constructor() {
    }
    fn_returns_obj(args) {
        return {
            hostname: args.host || 80,
            port: args.port || 80,
            path: args.endpoint || '/',
            method: args.method || 'GET',
            headers: args.headers || {}
        };
    }
    method() {
        return { "data": "reflected" };
    }
    fn_returns_other_fn_result(args) {
        return this.fn_returns_obj(args);
    }
    // This method to return an observable using the rx-http-request from: rx-http-request
    fn_returns_observable(conf, path) {
        const options = this.fn_returns_other_fn_result({ conf: conf, path: path });
        const url = `http://${options.hostname}:${options.port}${options.path}`;
        const options_ = { headers: options.headers };
        // const req = RxHttpRequest.get(url, options_);
        // return req.timeout(this.TIMEOUT);
    }
}
__decorate([
    Reflect.metadata("meta_test", this.method)
], ClassToTest.prototype, "method", null);
exports.ClassToTest = ClassToTest;
