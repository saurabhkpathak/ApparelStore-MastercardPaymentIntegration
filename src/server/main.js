var http = require('http');
var fs = require('fs');
var cors = require('cors')
var url = require('url');

var Simplify = require("simplify-commerce"),
client = Simplify.getClient({
    publicKey: 'sbpb_N2UxMjljZDUtN2ZkNi00OGMzLWJmNmMtODRiMzU2MmU1MTM2',
    privateKey: 'fW0gV8/zgUgkkeURGVFtfTFyuyMYJB8bw/EKbyTGVud5YFFQL0ODSXAOkNtXTToq'
});

var server = http.createServer();
server.on('request', function (request, response) {
  // var file = fs.createReadStream('test.json');

  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  console.log('token: ' + query.id);
  if(query.type === 'key') {
    response.writeHead(200);
    response.write(JSON.stringify(client.accesstoken.appKeys));
    response.end();
  } else if (query.type === 'payment') {
    client.payment.create({
      amount : "1000",
      token : query.id,
      description : "payment description",
      currency : "USD"
    }, function(errData, data){
        if(errData){
          response.writeHead(400);
          console.error("Error Message: " + errData.data.error.message);
          response.write(errData.data.error.message);
          return;
        }
        console.log("Payment Status: " + data.paymentStatus);
        response.writeHead(200);
        response.write(JSON.stringify(data));
        response.end();
    });
  }
}).listen(8080);
console.log('Listening on port 8080 with simplify');