var ADAM_DO_COUNT = 6;
var ADAM_VALUE_MIN = 0;
var ADAM_VALUE_MAX = 1;
var adam = [];
for (var i = 0; i < ADAM_DO_COUNT; i++) {
  adam.push({
    DO: {
      ID: i,
      VALUE: 0
    }
  })
}

var express = require('express'),
  xml = require('object-to-xml');
var app = express();
var bodyParser = require('body-parser');

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Express listening at http://%s:%s", host, port);
});

var device = {
  '?xml version=\"1.0\" encoding=\"iso-8859-1\"?' : null,
  'ADAM-6066' : {
    '@' : {
      status: 'OK'
    }
  }
};

// To allow CORS, HTTP requests from other domains.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.status(200);
  res.end();
});

app.get('/digitaloutput/:id/value', function(req, res) {
  console.log("Request for digital output channel: " + req.params.id);
  console.log(adam);
  var dout = req.params.id;
  if (Math.abs(dout) < adam.length) {
    res.status(200);
    res.set('Content-Type', 'text/xml');
    res.send(xml(adam[dout]));
  } else {
    res.status(501);
    res.end();
  }

});

app.get('/digitalinput/:id/:value', function(req, res) {
  console.log("Request for digital input channel: " + req.params.id + " value: " + req.params.value);
  console.log(adam);
  var din = req.params.id, val = req.params.value;
  if (Math.abs(din) < adam.length && val >= ADAM_VALUE_MIN && val <= ADAM_VALUE_MAX) {
    res.status(200);
    res.send(xml(device));
  } else {
    res.status(501);
    res.end();
  }

});



app.post('/digitaloutput/all/value', function(req, res) {
  console.log("Request for digital output " + req.body.DO0);

    res.status(200);
    res.set('Content-Type', 'text/xml');

    res.send(xml(adam));


});
