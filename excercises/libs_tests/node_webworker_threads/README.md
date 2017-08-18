# node-webworker-threads
From: *https://github.com/audreyt/node-webworker-threads*

- basic.js :
.. Just run the [demo.js](https://github.com/audreyt/node-webworker-threads/blob/master/examples/demo.js) under /examples in the repo.

- infinite_thread_test_1.js :
.. Created an infinite loop running on a thread using events, based on [ping-pong example](https://github.com/audreyt/node-webworker-threads/blob/master/examples/ex03_ping_pong.md)


_TODO:_

1. Create multiple Infinite Loop in multiple threads using individual set of threads for each loop.
2. Create multiple Infinite Loop in multiple threads using threadPool.
3. The ability to run and stop the infinite loops without ending the threads (with and without pools)
4. Use HTTP GET and in the response a POST request inside each infinite loop.
5. Create PoC communication modules for entry communicatios and out coimmunication.
6. Include the PoC communication modules inside the infinite loops.