var page = require('webpage').create();
page.open('http://example.com', function(status){
	console.log("status: "+ status);
	if(status === 'success'){
		page.render('example.png');
	}
	phantom.exit();
})