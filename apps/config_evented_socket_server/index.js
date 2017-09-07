/*
Will read a json confihg file to initialize events
and redirect them.
*/
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var namespace_queue = [];

console.log("config", config);

function searchObjectOnArray(name, namespaces) {
  return namespaces.filter(function (obj) {
    return obj.id === name;
  });
}

function createNamespace(data) {
  var namespace = {
    "name": data.name,
    "events": data.events
  };

  namespace_queue.push(namespace);
  return namespace;
}

function dynamicSocket(namespaceToConnect) {
  var dynamicNamespace = io.of(`/${namespaceToConnect.name}`);
  console.log("dynamicSocket", namespaceToConnect.name);
  dynamicNamespace.on('connection', function (ns_socket) {
    assignEvents(dynamicNamespace, namespaceToConnect, ns_socket)

    ns_socket.on('disconnect', function () {
      console.log('A user disconnected');
    });
  });
}

function assignEvents(dynamicNamespace, namespaceToConnect, ns_socket) {
  namespaceToConnect.events.forEach(function (event) {
    console.log("assignEvent", event);
    ns_socket.on(event, function (data) {
      console.log("Trigger event", data);
      if (data.namespaces) {
        console.log("new namespaces")
        createSocket(data.namespaces);
      } else {
        if (data.event) {
          dynamicNamespace.emit(data.event, data.info);
        } else {
          dynamicNamespace.emit(event, data);
        }
      }
    });
  });
}

function createSocket(namespaces) {
  namespaces.forEach(function (namespace) {
    var obj = searchObjectOnArray(namespace.name, namespace_queue);
    if (!obj.length) {
      createNamespace(namespace)
      console.log("createSocket", namespace);
      dynamicSocket(namespace);
    }
  });
}

createSocket(config.namespaces);

http.listen(1111, function () {
  console.log('Listening on *:1111');
});