/*
Here the testing the use of multiple threads to create multiple Infinite loop.
One for each
*/
function infinite_loop(i, continuu=true){
  console.log('infinite_loop');
  return i;
}

function run_IL(start){
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

// The numbers of loops will be the same number of threads:
var num_of_loops = 3;

console.log("Using "+ num_of_loops+ " threads and loops.");
var Worker = require('webworker-threads');
var threads = [];

while(num_of_loops > 0){
  var tread_worker = Worker.create();

  tread_worker.eval(infinite_loop);
  tread_worker.eval(run_IL);

  tread_worker.on('back', function(res){
    console.log(`In the back event with value: ${res}`);
    tread_worker.emit('run', parseInt(res)+1);
  })

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

// threads.forEach(function(i,v){

// });

threads[0].emit('run', 0, false);
setTimeout(function(){ threads[0].emit('stoppppp', 0); }, 2000);
setTimeout(function(){ threads[0].emit('run', 100, true); }, 4000);



threads[1].emit('run', 2000, true);
threads[2].emit('run', 30000, true);
