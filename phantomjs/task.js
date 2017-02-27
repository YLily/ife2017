var page = require('webpage').create(),
	system = require('system'),
	word;

if(system.args.length === 1){
	console.log('请输入关键字');
	phantom.exit();
}

word = system.args[1];
console.log(word);

page.onResourceReceived = function(response){
	console.log(JSON.stringify(response));
}

page.open('https://www.baidu.com/', function(status){
	page.includeJs('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', function(){
		page.evaluate(function(){
			$("#kw").val(word);
			$("#form").submit();
		})
		phantom.exit();
	})
})

