/*
This would be worker info to be loaded to a thread.

The idea is to test if we can require node js libs from within
*/

// var querystring = require('querystring');
// var http = require('http');



function create_request(){
  var postData = "\{'msg': 'Hello World!'\}";

  var options = {
    hostname: '10.3.8.109',
    port: 4444,
    path: '/posty',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  var http2 = httpp;

  console.log(`http2::: ${http2}`);



  var req = http2.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
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

function infinite_loop(i, continuu=true){
  try{
    console.log('infinite_loop');
    // write data to request body
    req = create_request();
    req.write(postData);
    req.end();
    return i;
  }catch(e){
    console.log('error', e.message);
  }
}

function run_IL(start){
  // console.log('Laura::::', JSON.parse(http2));
  // throw "fixed error";
  console.log('in run_IL...');
  var global_in_run = start;
  thread.on('run', function(i, start){
    if(eval(start)) global_in_run = true;
    console.log(`run_IL::run, ${i}, start: ${global_in_run}`);

    // The following while loop serves as a delay.
    var q=0;
    while(q<100000000){q++;};

    if(global_in_run) thread.emit('back', infinite_loop(i));
  });
  thread.on('stoppppp', function(i){
    global_in_run = false;
    console.log("Stopppppped loop", i);
  });
}