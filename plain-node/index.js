var http = require("http");

var port = 8000;

function requestHandler(req, res){
	res.writeHead(200);
	res.end('<html><body><h1>Hello World!</h1><p>How are you?</p></body></html>');
}

console.log("Creating the server...");
http.createServer(requestHandler).listen(port );
console.log("Created the server. Dial http port: " + port);