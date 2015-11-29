var ADAM_DO_COUNT = 6;
var ADAM_DI_COUNT = 6;
var ADAM_VALUE_MIN = 0;
var ADAM_VALUE_MAX = 1;
var adam = [];
for (var i = 0; i < ADAM_DO_COUNT; i++) {
  adam.push({
    DO: {
      ID: i,
      VALUE: 0
    }
  });
}
var dinputs = [];
for (var i = 0; i < ADAM_DI_COUNT; i++) {
  dinputs.push({
    DI: {
      ID: i,
      VALUE: Math.round(Math.random())
    }
  });
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
    res.write('<?xml version="1.0" ?> <ADAM-6250 status="OK">');
    res.write(xml(adam[dout]));
    res.write('</ADAM-6250>');
    res.end();
  } else {
    res.status(501);
    res.end();
  }

});

/*
RESPONSE
The content-type will be ‘text/xml’
If result is OK, the content will look like below
<?xml version="1.0" ?> <ADAM-6250 status=”OK”>
<DI> <ID>0</ID>
<VALUE>0</VALUE> </DI>
</ADAM-6250>
If result is failed , the content will look like below
<?xml version="1.0" ?>
<ADAM‐6250 status=”{error}”> </ADAM-6250>
{error} : The error message.
*/
app.get('/digitalinput/:id/value', function(req, res) {
  console.log("Request for digital input channel: " + req.params.id);
  var din = req.params.id;
  var device = dinputs[din];
  if (Math.abs(din) < adam.length) {
    res.status(200);
    res.write('<?xml version="1.0" ?> <ADAM-6250 status="OK">');
    res.write(xml(device));
    res.write('</ADAM-6250>');
    res.end();
  } else {
    res.status(501);
    res.end();
  }

});

/*
REQUEST

The content‐type will be ‘application/x‐www‐form‐urlencoded’. Examples:
Use the following URI to set the DO value(s). http://10.0.0.1/digitaloutput/all/value
The coming data with the request will be {name}={value} pair(s). {name} : The name of the channel, for example DO0.
{value} : The value to be set to the indicated channel.
For example, if the request is going to set channel 0, 1, 2 to value 1, then the name‐value pairs will look like below: DO0=1&DO1=1&DO2=1
RESPONSE
The content-type will be ‘text/xml’
The content will look like below
<?xml version="1.0" ?>
<ADAM‐6250 status=”{status}”>
</ADAM-6250>
{status} : The result. If succeed, the result will be ‘OK’; otherwise, the result will be the error message.
*/
app.post('/digitaloutput/all/value', function(req, res) {
  console.log("Request for digital output " + req.body);
  res.status(200);
  res.send('<?xml version="1.0" ?><ADAM‐6250 status=”OK”></ADAM-6250>');
  res.end();

});
