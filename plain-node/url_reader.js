var http = require("http");
var url = require("url");

//port to listen for incoming requests
var port = 8000;


console.log("Creating the server...");
var server = http.createServer(function (req, res){
	res.statusCode = 200;
	
	//if you ommit the second param to parse, the query params remain an unparsed string
	var parsedUrl= url.parse(req.url,true);
	
	var responseString = '<html><body><h1>I know what you just requested !</h1>'
	responseString +=  '<p>You requested:</p>' ;
	responseString +=  '<p>path: ' + parsedUrl.pathname + '</p>' ;

	var queryParams = parsedUrl.query;
	for( key in queryParams){
		responseString +=  '<p>queryParam : ' + key ;
		responseString +=  ' : ' + queryParams[key] + '</p>' ;
	}

	responseString +=  '<p>And that is all you asked for!</p>' ;
		
	res.end(responseString);
});

//Now listen for incoming requests
server.listen(port );

console.log("Created the server. Dial http port: " + port);