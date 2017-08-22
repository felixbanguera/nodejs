/*
Here the testing the use of Threads to create an Infinite loop
*/
function infinite_loop(i, continuu=true){
  console.log('infinite_loop');
  return true;
}

function run_IL(){
  console.log('in run_IL...');
  thread.on('run', function(i){
    console.log(`run_IL::run, ${i}`);
      thread.emit('back', infinite_loop(i));
  });
  thread.on('stoppppp', function(i){
    console.log("Stopppppped loop", i);
  });
}

var numThreads= 1;
console.log("Using "+ numThreads+ " threads.");
var Worker= require('webworker-threads');
var tread_worker = Worker.create();
// var tread_worker= Worker.createPool(numThreads)
tread_worker.eval(infinite_loop);
tread_worker.eval(run_IL);

tread_worker.on('back', function(res){
  console.log(`In the back event with value: ${res}`);
  tread_worker.emit('run', 1);
})

tread_worker.eval('run_IL()', function(err, result) {
  if (err) throw err;
  console.log("run_IL() is done!");
});

tread_worker.emit('run', 0);