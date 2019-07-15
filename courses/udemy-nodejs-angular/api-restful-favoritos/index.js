'use strict'
// ENTRYPOINT
var app = require('./app');
var port = process.env.PORT || 1010;

app.listen(port, () => {
  console.log('Hello world express!! in http://localhost:'+port);
});