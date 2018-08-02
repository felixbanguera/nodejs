/*
Will try to achieve the use of rxjs for http requests to avoid using callbacks

In this file:

*/
const Rx = require('rx');

const http_com = require('./http_com.js');

const postData = "\{'msg': 'Hello World!'\}";

const util = require('util');

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

/*
// This attempt is to manually use rxjs sendig the RX.subject as parameter
console.log('Running http_get to blank app using RX.subject object as parameter');
var req_get = http_com.get.request_with_subject('local_blank_app', '/getty', null, null, subject);
req_get.write(postData);
req_get.end();

subject.subscribe((data) => {
  console.log(`from subject::  status: ${data.status}, body: ${data.body}`);
});
*/

/*
//  ------ The following is NOT working fine, the lib seems to be deprecated --------
// The following to use an rx http lib from: https://github.com/Reactive-Extensions/rxjs-node
var obs_get = http_com.get.observable_request('local_blank_app', '/getty', null, null);

obs_get.subscribe((data) => {
  console.log(`Suscription to observable::: ${util.inspect(data)}`)
});
*/

/*
// The following to try to use rx-http-request from: rx-http-request
var obs_get = http_com.get.RxHtt_observable_request('local_blank_app', '/getty', 'get', null);
var obs_post = http_com.get.RxHtt_observable_request('local_blank_app', '/posty', 'POST', null);

obs_post.subscribe((data) => {
  console.log(`Suscription to observable POST ::: ${util.inspect(data.body)}`)
});
obs_get.subscribe((data) => {
  console.log(`Suscription to observable GET ::: ${util.inspect(data.body)}`)
});
*/

// The following to try to use rx-http-request in rx_http_com.js
const rx_http_com = require('./rx_http_com.js');
var obs_get = rx_http_com.get('local_blank_app', '/getty', 'get', null);
var obs_post = rx_http_com.post('local_blank_app', '/posty', 'POST', null, {name: 'felix', id: 111});

obs_post.subscribe((data) => {
  console.log(`Suscription to observable POST ::: ${util.inspect(data.body)}`)
}, (err) => {
  console.log(`ERROR to observable POST ::: ${util.inspect(err.message)}`)
});
obs_get.subscribe((data) => {
  console.log(`Suscription to observable GET ::: ${util.inspect(data.body)}`)
}, (err) => {
  console.log(`ERROR to observable GET ::: ${util.inspect(err.message)}`)
});
