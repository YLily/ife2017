var fragment, currentNodeList = [];
function Vue(obj){
	var _this = this;
	this.$options = obj;
	this.$el = document.querySelector(obj.el),
	this.$template = this.$el.cloneNode(true);
	this.$data = obj.data;

	this.compile(this.$template);

	this.observer = new Observer(this.$data);

	this.observer.$watch('user', function(){
		console.log('重新渲染');
		_this.compile(_this.$template)
	})
	this.observer.$watch('city', function(){
		console.log('重新渲染');
		_this.compile(_this.$template)
	})

	
}
Vue.prototype = {
	compile: function(node){
		fragment = document.createDocumentFragment();
		currentNodeList.push(fragment);

		this.compileNode(this.$template);

		this.$el.parentNode.replaceChild(fragment, this.$el);
		this.$el = document.querySelector(this.$options.el);
	},
	compileNode: function(node){
		switch (node.nodeType){
			//元素
			case 1: this.compileEle(node); break;
			//文本
			case 3:  this.compileText(node); break;
			default: return;
		}
	},
	compileEle: function(node){
		var newNode = document.createElement(node.tagName);

		if(node.hasAttributes()){
			Array.from(node.attributes).forEach((attr) =>{
				newNode.setAttribute(attr.name, attr.value);
			})
		}
		var currentNode = currentNodeList[currentNodeList.length-1].appendChild(newNode);

		if(node.hasChildNodes()){
			currentNodeList.push(currentNode);
			Array.from(node.childNodes).forEach(this.compileNode, this);
		}
		currentNodeList.pop();
	},
	compileText: function(node){
		let nodeValue = node.nodeValue;

		if(nodeValue === '') return;

		let reg = /{{.*\w+}}/g;

		var res = nodeValue.match(reg);

		if(!res) return; 

		res.forEach(value => {
			let property = value.replace(/[{}]/g, '');

			let arr = property.split('.');

			let val = this.$data;
			arr.forEach(value => {
				val = val[value];
			})

			nodeValue = nodeValue.replace(value, val)
		}, this);

		currentNodeList[currentNodeList.length - 1].appendChild(document.createTextNode(nodeValue));
		console.log(currentNodeList[0]);

	}
}


function Observer(data){
	this.data = data;
	this.walk(this.data);
}
Observer.prototype = {
	observer: function(value){	
		if(typeof value === 'object'){
			return new Observer(value)
		}
	},
	walk: function(obj){
		for(let key in obj){
			if (obj.hasOwnProperty(key)){
				this.observer(obj[key])
				this.convert(key, obj[key]);
			} 
		}
	},
	convert: function(key, val){
		var dep = new Dep();
		var _this = this;
		Object.defineProperty(this.data, key, {
			enumerable: true,
	        configurable: true,
			get: function(){
				if(Dep.target){
					dep.addSub(Dep.target)
				}
				console.log('你访问了' + key);
				return val
			},
			set: function(newVal){
				var value = val;
				if(newVal == value) return;
				val = newVal;
				console.log('你设置了' + key + '为' + newVal);
				_this.observer(newVal)
				dep.notify()
			}
		})
	},
	$watch: function(express, cb){
		new Watcher(this.data, express, cb);
	}
}


/*消息 订阅器*/
function Dep(){
	this.subs = [];
}
Dep.target = null;
Dep.prototype = {
	addSub: function(sub){
		this.subs.push(sub)
	},
	notify: function(){
		this.subs.forEach(sub => sub.update())
	}
}

/* 订阅者 */
function Watcher(vm, express, cb){
	this.cb = cb,
	this.vm = vm,
	this.express = express,
	this.value = this.get();
}
Watcher.prototype = {
	update: function(){
		this.run()
	},
	run: function(){
		const value = this.get();
		if(value !== this.value){
			this.value = value;
			this.cb.call(this.vm, this.value)
		}
	},
	get: function(){
		Dep.target = this;
		const value = this.vm[this.express];
		if(typeof value === 'object'){
			for(let child in value){
				new Watcher(value, child, this.cb);
			}
		}
		Dep.target = null;
		return value
	}
}