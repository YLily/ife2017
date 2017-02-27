# init

```js
var chart = echarts.init(ele);
chart.setOption(option);
```

# option

```js
var option = {
	backgroundColor: '#f7f7f7', //背景色
	textStyle: { //文字颜色
        color: 'rgba(55, 55, 55, .8)',
        fontWeight: 'bold'
    },
	title: {
		text: ''
	},
	tooltip: {},
	legend: {
		data: ['北京', '上海', '武汉']
	},
	xAxis: {
		data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
	},
	yAxis: {},
	series:[{
		name: '北京',
		type: 'bar',
		data: [113, 56, 87, 108, 164, 189, 131]
	}, {
		name: '上海',
		type: 'bar',
		data: [52, 73, 82, 93, 59, 81, 84]
	}, {
		name: '武汉',
		type: 'bar',
		data: [107, 88, 98, 49, 65, 78, 92]
	}]
}
```

type 

* bar  柱状图
* pie  饼状图
* line 折线图
