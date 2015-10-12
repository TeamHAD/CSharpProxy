var express = require('express');
var app = express();

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Express listening at http://%s:%s", host, port);
});

var devices = {
  '032f8787b5f3752b6b6d300b9ef15dbf': {
    'description': 'Front door lock',
    'address': '10.0.0.20',
    'port': '8000',
    'status': 'unlocked'
  },
  '981e65d74c75aeb439b25fb89f6360b2': {
    'description': 'Tempature sensor',
    'address': '10.0.0.30',
    'port': '8080',
    'status': '72°'
  },
  '385ebf17900519fd9f4fe35767de3dd8': {
    'description': 'Front door open sensor',
    'address': '10.0.0.3',
    'port': '443',
    'status': 'open'
  },
};


app.get('/', function(req, res) {
  res.status(200);
  res.end();
});

app.get('/getDevices', function(req, res) {
  res.status(200);
  res.json(devices);
});

app.get('/getDevice/:id', function(req, res) {
  var dev = devices[req.params.id];
  if (dev) {
    res.status(200);
    res.json(dev);
  } else {
    res.status(400);
    res.json("Device not found.");
  }
});
