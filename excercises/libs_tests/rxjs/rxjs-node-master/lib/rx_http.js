/**
* Copyright 2011 Microsoft Corporation
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const util = require('util');

var Rx = require('rx');
// var Rx   = require("./rx.node");
var http = require("http");
for(var k in http) {
    exports[k] = http[k];
}
exports.createServer = function() {
    var subject = new Rx.AsyncSubject(),
    handler = function(request, response) {
        subject.onNext( { request: request, response:  response });
        subject.onCompleted();
    },
    observable = subject.asObservable();
    observable.server = http.createServer(handler);
    return observable;
};
exports.request = function(options) {
    console.log(`rx_http::request::`);
    var subject = new Rx.AsyncSubject(),
    handler = function (response) {
        console.log(`response in handlere : ${response}`);
        subject.onNext(response);
        subject.onCompleted();
    },
    errHandler = function (err) {
        subject.onError(err);
    },
    observable = subject.asObservable();
    observable.request = http.get(options, handler).on('error', errHandler);
    console.log(`rx_http::request::observable.request:`);
    return observable;
};
exports.get = function (options) {
    var subject = new Rx.AsyncSubject(),
    handler = function (response) {
        console.log('The handler');
        subject.onNext(response);
        subject.onCompleted();
    },
    errHandler = function (err) {
        subject.onError(err);
    };
    http.get(options, handler).on('error', errHandler);
    return subject;
};
