var page = require('webpage').create(),
	system = require('system'),
	word = system.args[1],
	dv = system.args[2],
	url = 'https://www.baidu.com/s?wd='+word,
	t = Date.now(),
	dataList = [],
	result = {};

var device = {
	'iphone5': {
		'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
		'viewportSize': {
			'width': 320,
			'height': 568
		}
	},
	'iphone6': {
		'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
		'viewportSize': {
			'width': 375,
			'height': 667
		}
	},
	'ipad': {
		'userAgent': 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
		'viewportSize': {
			'width': 768,
			'height': 1024
		}
	}
}

if(system.args.length !== 3){
	console.log('请输入关键字和设备名');
	phantom.exit();
}

if(dv === 'iphone5' || dv === 'iphone6' || dv === 'ipad'){
	page.settings.userAgent = device[dv].userAgent;
	page.viewportSize = device[dv].viewportSize;
}else{
	console.log('device must be iphone5/iphone6/ipad');
	phantom.exit();
}

page.open(url, function(status){
	if(status === 'success'){
		page.includeJs('jquery-1.9.1.min.js', function(){
			dataList = page.evaluate(function(){
				var data = [];
				$("#results").find(".result").each(function (index) {
					data.push({
						title: $(this).find(".c-title").text() || '', 
						info: $(this).find(".c-row").text() || '',
						link: $(this).find(".c-blocka").attr('href') || '',    
						pic: $(this).find(".c-img img").attr('src') || ''
					})
		        });
				return data;
			})
			result = {
		       code: 1,
		       msg: '抓取成功',
		       word: word,
		       time: Date.now() - t,
		       device: device[dv],
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
