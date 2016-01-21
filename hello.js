var express = require('express');
var app = express()

var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);

// Start server

var server = app.listen(port, host, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});

app.get('/', function (req, res) {
  res.send('Hello World!')
});



