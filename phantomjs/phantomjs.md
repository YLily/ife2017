[phantomjs](http://javascript.ruanyifeng.com/tool/phantomjs.html#toc10)

# 退出

```js
phantom.exit()  //没有phantom.exit, PhantomJS 不会停止运行
```

# system模块

加载操作系统的变量，system.args是参数数组

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
# webpage模块

### open()

打开具体的网页

对http请求进行更详细的配置
```js
var page = require('webpage').create();
var settings = {
	operation: 'post',
	endoding: 'utf8',
	headers: {
		'Content-Type': 'application/json'
	},
	data: JSON.stringify({
		some: 'data',
		another: ['custom', 'data']
	})
}
page.open(url, setting, function(status){
	
})
```

### render方法

用于将网页保存成图片，参数就是指定的文件名。该方法根据后缀名，将网页保存成不同的格式，目前支持PNG、GIF、JPEG和PDF

### clipRect

网页截图的大小
左上角从网页的(0. 0)坐标开始，宽400像素，高600像素
不指定这个值，就表示对整张网页截图

```js
page.clipRect = {
	top: 0,
	left: 0,
	width: 400,
	height: 600
}
```

### evalute
evaluate方法用于打开网页以后，在页面中执行JavaScript代码
网页内部的console语句，以及evaluate方法内部的console语句, 不会显示在命令行
采用onConsoleMessage回调函数重写

### includeJs()

加载外部脚本

```js
var page = require('webpage').create();
page.onConsoleMessage = function (msg) { 
    console.log('Page title is ' + msg);
};
page.open('http://example.com', function(status){
	console.log("status: "+ status);
	if(status === 'success'){
		page.render('example.png'); //网页截屏
		page.includeJs("http://path/to/jquery.min.js", function() {
		    page.evaluate(function() {
		      	console.log(document.title);
		    });
		    phantom.exit()
		});
	}else{
		phantom.exit();
	}	
})
```
### viewportSize

指定浏览器视口的大小，即网页加载的初始浏览器窗口大小
Height字段必须指定，不可省略

### zoomFactor

用来指定渲染时（render方法和renderBase64方法）页面的放大系数，默认是1（即100%）

```js
var page = require('page').create();
page.viewportSize = {
	width: 480,
	height: 800
}
page.zoomFactor = 0.25;
page.render('capture.png')''
```

### 网络请求onResourceRequested

http请求

* id 所请求资源的变化
* method  使用的http方法
* url 所请求的资源url
* time 一个包含请求时间的Date对象
* headers  http头部信息数组

方法

* abort() 终止当前网络请求，会导致调用onResourceError回调函数
* changeUrl(newUrl) 改变当前网络请求的url
* setHeader(key, value) 设置http头信息

### 网络响应onResourceReceived

http响应

* id 所请求资源的变化
* url 所请求的资源url, 包含时间的Date对象
* headers  http头部信息数组
* bodySize 解压缩后收到的内容大小
* contentType 收到的内容种类
* redirectURL 重定向URL
* stage 多数http回应，头一个数据块未start，最后一个数据快未end
* status http状态吗，成功时未200
* statusText http状态信息，如ok

```js
var page = require('webpage').create();

page.onResourceRequested = function(request){
	console.log('request ' + JSON.stringify(request, undefined, 4));
}
page.onResourceReceived = function(response){
	console.log('receive ' + JSON.stingify(response, undefined, 4));
}

page.open('http://example.com');
```