# 退出

```js
phantom.exit()  //没有phantom.exit, PhantomJS 不会停止运行
```

# 参数

```js
var system = require('system');
if(system.args.length === 1){
	phantom.exit();
}else{
	system.args.forEach(function(arg, i){
		console.log(i + ': ' + arg);
	})
	phantom.exit();
}

```

# render方法

用于将网页保存成图片，参数就是指定的文件名。该方法根据后缀名，将网页保存成不同的格式，目前支持PNG、GIF、JPEG和PDF

```js
var page = require('webpage').create();
page.open('http://example.com', function(status){
	console.log("status: "+ status);
	if(status === 'success'){
		page.render('example.png'); //网页截屏
	}
	phantom.exit();
})
```

# evalute
evaluate方法用于打开网页以后，在页面中执行JavaScript代码
网页内部的console语句，以及evaluate方法内部的console语句, 不会显示在命令行
采用onConsoleMessage回调函数重写

```js
var page = require('webpage').create();
page.onConsoleMessage = function (msg) { 
    console.log('Page title is ' + msg);
};
page.open(url, function (status) {
    page.evaluate(function () {
        console.log(document.title); 
    });
});
```

# 网络请求与响应