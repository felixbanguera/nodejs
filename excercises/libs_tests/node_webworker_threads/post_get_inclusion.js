/*
Here the testing the use of multiple threads to create multiple Infinite loop.
One for each. INCLUDING POST and GET in the infinite loop call

NEW: now using a worker_1.js external file to be loaded to a thread

 ---------------------------- NOT READY YET
 Having problems passing libs into the thread to be used by
  the methods to create the requests.
*/

// The numbers of loops will be the same number of threads:
var querystring = require('querystring');
var http = require('http');

console.log('hhhtttppp:', JSON.stringify(http));

var num_of_loops = 1;

console.log("Using "+ num_of_loops+ " threads and loops.");
var Worker = require('webworker-threads');
var threads = [];

while(num_of_loops > 0){
  var tread_worker = Worker.create();

  // tread_worker.eval("JASON= "+ JASON.stringify(JASON));
  tread_worker.eval("httpp= "+ JSON.stringify(http));

  // tread_worker.eval("console.log('http:::', http);");
  // tread_worker.eval(querystring);
  // tread_worker.eval(infinite_loop);
  // tread_worker.eval(run_IL);

  tread_worker.on('back', function(res){
    console.log(`In the back event with value: ${res}`);
    tread_worker.emit('run', parseInt(res)+1);
  })

  tread_worker.load(__dirname + '/worker_1.js');

  tread_worker.eval('run_IL(true)', function(err, result) {
    if (err) {
      console.log(`Error: ${err}`);
      throw err;
    };
    console.log("run_IL() is done!");
  });

  threads.push(tread_worker);
  num_of_loops--;
}

// req.write(postData);
// req.end();


threads[0].emit('run', 0, false);
// setTimeout(function(){ threads[0].emit('stoppppp', 0); }, 2000);
// setTimeout(function(){ threads[0].emit('run', 100, true); }, 4000);



// threads[1].emit('run', 2000, true);
// threads[2].emit('run', 30000, true);
