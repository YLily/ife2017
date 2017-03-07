# init

```js
var chart = echarts.init(dom, theme, opts);
chart.setOption(option, notMerge, lazyUpdate);
```

# setOption

```js
chart.setOption(option, {
	notMerge: false,  //不跟之前设置的option合并，默认false
	lazyUpdate: false,  //设置完option后是否不理解更新图表，默认false
	silent: false  //默认false，阻止调用setOption时抛出事件
})
```

### [option](http://echarts.baidu.com/option.html)

```js
var option = {
	//标题组件
	title: {
		text: '',   //主标题
		subtext: '' //副标题
	},
	//图例组件
	legend: {
		data: ['北京', '上海', '武汉']
	},
	//直角坐标系内绘图网格，可存在多个
	grid: [
		{},
		{}
	],
	//直角坐标系grid中的x轴
	xAxis: {
		gridIndex: 0, //默认第一个grid
		offset: 0, // x轴相对于默认位置的便宜，有多个x轴时使用
		type: '',  
		//value 数值轴，用于连续数据
		//category 类目轴，适用于离散的类目数据，必须通过data设置类目数据
		//time 时间轴，适用于连续的时序数据
		//log 对数轴，适用于对数数据
		data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
	},
	yAxis: {},
	polar: {},  //极坐标系
	geo: {},  //地理坐标系组件
	parallel: {},  //平行坐标系
	singleAxis: {}, //单轴
	timeline: {},  //timeline组件
	graphic: {},  //原生图行元素组件
	//提示框组件
	tooltip: {
		trigger: 'item',  //item数据项图形触发 axis坐标轴触发
		triggerOn: 'mousemove',  //mousemove\click\none
	},
	//工具栏, 导出图片、数据视图、动态类型切换、数据区域缩放、重置
	toolbox: {
	},
	//系列列表
	//line 折线图
	//bar  柱状图
	//pie  饼状图
	series:[{
		name: '北京',
		type: 'bar',
		data: [113, 56, 87, 108, 164, 189, 131],
		itemStyle: {
			normal: {
				color: '#d6f7ad'
			},
			emphasis: {
		        shadowBlur: 4,
		        shadowColor: 'rgba(0, 0, 0, .2)'
			}
		}
	}, {
		name: '上海',
		type: 'bar',
		data: [52, 73, 82, 93, 59, 81, 84]
	}, {
		name: '武汉',
		type: 'bar',
		data: [107, 88, 98, 49, 65, 78, 92]
	}],
	//调色盘颜色类别
	color: [],
	backgroundColor: '#f7f7f7', //背景色
	textStyle: { 
        color: 'rgba(55, 55, 55, .8)',
        fontWeight: 'bold'
    }
}
```

