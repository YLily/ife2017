function Observer(data){
	this.data = data;
	this.walk(this.data);
}

Observer.prototype.walk = function(obj){
	for(let key in obj){
		this.convert(key, obj[key]);
	}
},
Observer.prototype.convert = function(key, val){
	Object.defineProperty(this.data, key, {
		enumerable: true,
        configurable: true,
		get: function(){
			console.log('你访问了' + key);
			return val
		},
		set: function(newVal){
			console.log('你设置了' + key + '为' + newVal);
			if(newVal == val) return;
			val = newVal;
		}
	})
};