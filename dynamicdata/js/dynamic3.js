function Observer(data){
	this.data = data;
	this.walk(this.data);
}

var op = Observer.prototype;

op.walk = function(obj){
	for(let key in obj){
		if (obj.hasOwnProperty(key)){
			observer(obj[key])
			this.convert(key, obj[key]);
		} 
	}
},
op.convert = function(key, val){
	var dep = new Dep();
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
			observer(newVal)
			dep.notify()
		}
	})
},
op.$watch = function(express, cb){
	new Watcher(this.data, express, cb);
}

function observer(value){
	if(typeof value === 'object'){
		return new Observer(value)
	}
}

/*消息 订阅器*/
function Dep(){
	this.subs = [];
}
var dp = Dep.prototype;
dp.addSub = function(sub){
	this.subs.push(sub)
}
dp.notify = function(){
	this.subs.forEach(sub => sub.update())
}
Dep.target = null;

/* 订阅者 */
function Watcher(vm, express, cb){
	this.cb = cb,
	this.vm = vm,
	this.express = express,
	this.value = this.get();
}
var wp = Watcher.prototype;
wp.update = function(){
	this.run()
}
wp.run = function(){
	const value = this.get();
	if(value !== this.value){
		this.value = value;
		this.cb.call(this.vm, this.value)
	}
}
wp.get = function(){
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

