var dns = require("native-dns");
var server = dns.createServer();

server.on("request", function (request, response) {
  //console.log(request)
  response.answer.push(
    dns.A({
      name: request.question[0].name + "PRAVIN",
      address: "19.19.19.19",
      ttl: 600,
    })
  );

  response.send();
});

server.on("error", function (err, buff, req, res) {
  console.log(err.stack);
});

server.serve(15353);
