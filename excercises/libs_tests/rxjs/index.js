/*
Will try to achieve the use of rxjs for http requests to avoid using callbacks

In this file:

*/
const Rx = require('rx');

const http_com = require('./http_com.js');

const postData = "\{'msg': 'Hello World!'\}";

const subject = new Rx.Subject();

/*
// This first attempt is to manually use rxjs sendig the RX.subject through callback fuction
console.log('Running http_get to balnk app');
var req_get = http_com.get.request_with_callback('local_blank_app', '/getty', null, null, subject_callback);
req_get.write(postData);
req_get.end();

subject.subscribe((data) => {
  console.log(`from subject_callback status: ${data.status}, body: ${data.body}`);
});

function subject_callback(status, body){
  subject.onNext({status: status, body: body});
};
*/


// This attempt is to manually use rxjs sendig the RX.subject as parameter
console.log('Running http_get to blank app using RX.subject object as parameter');
var req_get = http_com.get.request_with_subject('local_blank_app', '/getty', null, null, subject);
req_get.write(postData);
req_get.end();

subject.subscribe((data) => {
  console.log(`from subject::  status: ${data.status}, body: ${data.body}`);
});



// // The following to use an rx http lib from: https://github.com/Reactive-Extensions/rxjs-node
// const rx_http = require('./rx-node-master/lib/rx-http.js');