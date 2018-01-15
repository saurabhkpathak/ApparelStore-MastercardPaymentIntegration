var http = require('http');
var fs = require('fs');
var cors = require('cors')
var express = require('express');

var app = express()
app.use(cors());

var server = http.createServer();
server.on('request', function (request, response) {
  response.writeHead(200);
  var file = fs.createReadStream('test.json');
  file.pipe(response);
}).listen(8080);
console.log('Listening on port 8080...');
