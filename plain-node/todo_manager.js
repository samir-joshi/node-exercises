var http = require("http");
var url = require("url");
var fs = require("fs");


//port to listen for incoming requests
var port = 8000;

function addTask(task){
	fs.appendFile('todo.txt', task +'\n', function (err) {
	if (err) {
		console.log('Error saving the task ' + task );
		console.log(err);
	} else {
		console.log('Saved the task ' + task );
	}
});
}

function readTasks(){
	var results = [];
	var fileContents = fs.readFileSync('todo.txt');
	console.log('The contents of the file are: ' + fileContents );
	console.log('The type of the contents are : ' + (typeof fileContents));
	if(fileContents){
		results = String(fileContents).split('\n');
	}
	console.log('The results are : ' + results);
	return results;
}


console.log("Creating the server...");
var server = http.createServer(function (req, res){
	res.statusCode = 200;
	var responseString = '<html><body><h1>Welcome to your humble todo task manager, where no task gets done !</h1>'	

	//if you ommit the second param to parse, the query params remain an unparsed string
	var parsedUrl= url.parse(req.url,true);
	
	if(parsedUrl.query.add && parsedUrl.query.task ){
		addTask(parsedUrl.query.task);
		responseString +=  '<p> I guess the task ' +  parsedUrl.query.task + ' is added. Try listing tasks to be sure. </p>' ;
	}else if (parsedUrl.query.list){
		responseString +=  '<p> Here are the tasks to be done: </p>' ;
		var tasks = readTasks();
		responseString +=  '<ol>';
		tasks.forEach( function (taskArrayElement){
			if(taskArrayElement.length > 0){
				responseString +=  '<li> ' + taskArrayElement +   ' </li>' ;
			}

		});
		responseString +=  '</ol>';
		responseString +=  '<p> I hope that is enough to keep you busy for a while. </p>' ;

	} else {
		responseString +=  '<p> I understand only two commands: </p>' ;
		responseString +=  '<p>1. add=y&task=whatevertaskdescription</p>' ;
		responseString +=  '<p>2. list=y</p>' ;
		responseString +=  '<p>So pretty please, talk to me in the way i understand. </p>' ;
	}

		
	res.end(responseString);
});

server.listen(port);
console.log("The server is ready to serve.");