/*
The Events module methods:

addListener(event, listener)
on(event, listener)
once(event, listener)
removeListener(event, listener)
removeAllListeners([event])
setMaxListeners(n)
listeners(event)
emit(event, [arg1], [arg2], [...])
*/

var events = require('events');
var eventEmitter = new events.EventEmitter();

// listener #1
var listener1 = function (){
  console.log('listener 1 Executed');
};

// listener #2
var listener2 = function (){
  console.log('listener 2 Executed');
};

// Bind the connection event with the 2 listeners on different ways:
eventEmitter.addListener('connection', listener1);
eventEmitter.on('connection', listener2);

var eventlisteners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventlisteners + "Listener(s) listening to connection event");

// Fire the connection event
eventEmitter.emit('connection');

// Remove the binding of listener 1
eventEmitter.removeListener('connection', listener1);
console.log('listener1 will Not listen now');

// Fire the connection event
eventEmitter.emit('connection');

eventlisteners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventlisteners + "Listener(s) listening to connection event");