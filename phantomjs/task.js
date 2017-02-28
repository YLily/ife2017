var page = require('webpage').create(),
	system = require('system'),
	word = system.args[1],
	url = 'https://www.baidu.com/s?wd='+word,
	t = Date.now(),
	dataList = [],
	result = {};

if(system.args.length === 1){
	console.log('请输入关键字');
	phantom.exit();
}

page.open(url, function(status){
	console.log(status);
	if(status === 'success'){
		page.includeJs('jquery-1.9.1.min.js', function(){
			dataList = page.evaluate(function(){
				var data = [];
				$("#content_left").find(".c-container").each(function(i){
					data.push({
						title: $(this).find(".t").text() || '', 
						info: $(this).find(".c-abstract").text() || $(this).find(".c-span-last p").eq(0).text() || '',
						link: $(this).find(".t a").attr('href') || '',    
						pic: $(this).find(".c-img").attr('src') || ''
					})
				})
				return data;
			})
			result = {
		       code: 1,
		       msg: '抓取成功',
		       word: word,
		       time: Date.now() - t,
		       dataList: dataList
		    }
			console.log(JSON.stringify(result, null, 4));
			phantom.exit();
		})
	}else{
		result = {
	       code: 0,
	       msg: '抓取失败',
	       word: word
	    }
	    console.log(JSON.stringify(result));
	    phantom.exit();
	}	
})
