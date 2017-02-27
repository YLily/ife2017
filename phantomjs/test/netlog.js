var page = require('webpage').create();

page.onResourceRequested = function(request){
	console.log('request ' + JSON.stringify(request, undefined, 4));
}
page.onResourceReceived = function(response){
	console.log('receive ' + JSON.stingify(response, undefined, 4));
}

page.open('http://example.com');