'use strict'
// CONFIGURACION de EXPRESS
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var api = require('./routes/favorite');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',api);

// app.get('/test', (req, res) => {
//   res.send({msg: "Hello World of api with express!"});
// });

// app.get('/testwithparam/:param', (req, res) => {
//   const parameter = req.params.param;
//   res.send(
//     {msg: "Hello World of api with express with param: !",
//     parameter
//   });
// });

// app.get('/testwithoptionalparam/:optparam?', (req, res) => {
//   const parameter = req.params.optparam || "No parameter passed through";
//   res.send(
//     {msg: "Hello World of api with express with param: !",
//     parameter
//   });
// });

module.exports = app;