// var dns = require("native-dns");
import dns from "native-dns";
var server = dns.createServer();

server.on("request", function (request, response) {
  //console.log(request)
  response.answer.push(
    dns.A({
      name: request.question[0].name,
      address: "142.250.183.142",
      ttl: 600,
    })
  );
  console.log("DNS CALLED");
  response.send();
});

server.on("error", function (err, buff, req, res) {
  console.log(err.stack);
});
server.serve(1535);
