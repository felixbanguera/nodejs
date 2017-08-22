/*
Here the testing the use of pools to create multiple Infinite loop
*/
function infinite_loop(i, continuu=true){
  console.log('infinite_loop');
  return i;
}

function run_IL(){
  console.log('in run_IL...');
  thread.on('run', function(i){
    console.log(`run_IL::run, ${i}`);
      var q=0;
      // The following while loop serves as a delay.
      while(q<1000000000){q++;};
      thread.emit('back', infinite_loop(i));
  });
  thread.on('stoppppp', function(i){
    console.log("Stopppppped loop", i);
  });
}

var numThreads = 3;
console.log("Using "+ numThreads+ " threads.");
var Worker= require('webworker-threads');
// var tread_worker = Worker.create();
var tread_worker= Worker.createPool(numThreads)
tread_worker.all.eval(infinite_loop);
tread_worker.all.eval(run_IL);

tread_worker.on('back', function(res){
  console.log(`In the back event with value: ${res}`);
  tread_worker.any.emit('run', parseInt(res)+1);
})

tread_worker.all.eval('run_IL()', function(err, result) {
  if (err) {
    console.log(`Error: ${err}`);
    throw err
  };
  console.log("run_IL() is done!");
});

tread_worker.any.emit('run', 0);
tread_worker.any.emit('run', 100);
tread_worker.any.emit('run', 2000);
tread_worker.any.emit('run', 30000);
tread_worker.any.emit('run', 400000);