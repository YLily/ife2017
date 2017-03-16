function ColorPicker(color){
	this.colorPicker = document.getElementById('colorPicker'),
	this.area = document.getElementById("colorArea"),
	this.areaPicker = this.area.getElementsByTagName('div')[0];
	this.tape = document.getElementById('colorTape'),
	this.tapePicker = this.tape.getElementsByTagName('div')[0];
	this.curColor = document.getElementById('curColor'),
	this.inputs = colorPicker.getElementsByTagName('input');

	this.canMoveTape = false,
	this.canMoveArea = false;
	var _this = this;
	document.onmouseup = function(e){
		_this.canMoveTape = false,
		_this.canMoveArea = false;
		_this.getColor();
	}

	color ? (this.color = color, this.setColor()) : this.rgb = [255, 0, 0];

	this.rgb2hsb(),
	this.rgb2hsl();

	this.bg = [255, 0, 0];

	this.showRgb(),
	this.showHsl(),
	this.showBg(),
	this.showPicker(),
	this.showColor();

	this.changeColor(),
	this.changeNum();
}

ColorPicker.prototype.rgb2hsb = function(){
	var r = this.rgb[0] / 255, 
		g = this.rgb[1] / 255,
		b = this.rgb[2] / 255;

	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);

	var h, s;

	if(max == min){
		h = 0;
	}else if(max == r && g >= b){
		h = 60 * (g - b)/(max - min);
	}else if(max == r && g < b){
		h = 60 * (g - b)/(max - min) + 360;
	}else if(max == g){
		h = 60 * (b - r)/(max - min) + 120;
	}else if(max == b){
		h = 60 * (r - g)/(max - min) + 240;
	}
	
	if(max == 0){
		s = 0;
	}else{
		s = (max - min)/max;
	}
	
	this.hsb = [Math.round(h), Math.round(s*100), Math.round(max*100)];
},
ColorPicker.prototype.hsb2rgb = function(){
	var h = this.hsb[0] === 360 ? 0 : this.hsb[0],
		s = this.hsb[1]/100,
		b = this.hsb[2]/100;
	var hi = Math.floor(h/60)%6,
		f = h/60 -hi;

	var p = b * (1-s),
		q = b * (1- f * s),
		t = b * (1- (1 - f) * s);
	
	if (hi == 0) this.rgb = [Math.round(b*255), Math.round(t*255), Math.round(p*255)];
	else if(hi == 1) this.rgb = [Math.round(q*255), Math.round(b*255), Math.round(p*255)];
	else if(hi == 2) this.rgb = [Math.round(p*255), Math.round(b*255), Math.round(t*255)];
	else if(hi == 3) this.rgb = [Math.round(p*255), Math.round(q*255), Math.round(b*255)];
	else if(hi == 4) this.rgb = [Math.round(t*255), Math.round(p*255), Math.round(b*255)];
	else if(hi == 5) this.rgb = [Math.round(b*255), Math.round(p*255), Math.round(q*255)];
},
ColorPicker.prototype.rgb2hsl = function(){
	var r = this.rgb[0] / 255, 
		g = this.rgb[1] / 255,
		b = this.rgb[2] / 255;
	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h, s, l;

	l = (max + min) / 2;

	if(max == min){
		h = s = 0;
	}else{
		s = l < 0.5 ? (max - min)/(max + min) : (max -min)/(2 - max -min);
		if(r == max) h = (g - b)/(max - min) + ( g < b ? 6 : 0)
		if(g == max) h = (b - r)/(max - min) + 2
		if(b == max) h = (r - g)/(max - min) + 4
		h /= 6;
	}
	this.hsl = [Math.round(360 * h), Math.round(100 * s), Math.round(100 * l)];
},
ColorPicker.prototype.hsl2rgb = function(){
	var h = this.hsl[0],
		s = this.hsl[1] / 100,
		l = this.hsl[2] / 100;
	var r, g, b;
	if(s == 0){
		r = g = b = l;
	}else{
		var q = l < 0.5 ? l * (l + s) : l + s - l * s,
			p = 2 * l - q;
		r = toRgb(p, q, h + 1/3),
		g = toRgb(p, q, h),
		b = toRgb(p, q, h - 1/3);

		function toRgb(p, q, t){
			t < 0 && (t += 1),
			t > 1 && (t -= 1);
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}
	}
	this.rgb = [Math.round(255 * r), Math.round(255 * g), Math.round(255 * b)];
},
ColorPicker.prototype.setColor = function(color){
	var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
	this.color = this.color.toLowerCase();
	if(this.color && reg.test(this.color)){
		if(this.color.length === 4){
			var newColor = "#";
			for(var i=1; i<4; i+=1){
				newColor += this.color.slice(i,i+1).concat(this.color.slice(i,i+1));	
			}
			this.color = newColor;
		}
		//处理六位的颜色值
		var colorArr = [];
		for(var i=1; i<7; i+=2){
			colorArr.push(parseInt("0x"+this.color.slice(i,i+2)));	
		}
		this.rgb = colorArr;
	}
},
ColorPicker.prototype.getColor = function(){
	var color = '#';
	color += Number(this.rgb[0]).toString(16) == 0 ? '00' : Number(this.rgb[0]).toString(16);
	color += Number(this.rgb[1]).toString(16) == 0 ? '00' : Number(this.rgb[1]).toString(16);
	color += Number(this.rgb[2]).toString(16) == 0 ? '00' : Number(this.rgb[2]).toString(16);
	this.color = color;

	var Html = '';
	Html += '<p>当前颜色为:</p>';
	Html += '<p>color: '+this.color+'</p>';
	Html += '<p>rgb('+ this.rgb+')</p>';
	Html += '<p>hsb('+ this.hsb +')</p>';
	Html += '<p>hsl('+ this.hsl +')</p>';

	document.getElementById('showColor').innerHTML = Html;

	function myFunction()
	{
		var node=document.createElement("LI");
		var textnode=document.createTextNode("Water");
		node.appendChild(textnode);
		document.getElementById("myList").appendChild(node);
	}
},
ColorPicker.prototype.showBg = function(){
	var t = Math.floor(this.hsb[0] / 60),
		n = Math.round(this.hsb[0] % 60 * 255 / 60);
	switch(t){
		case 0: this.bg[0] = 255, this.bg[1] = n, this.bg[2] = 0; break;
		case 1: this.bg[0] = 255 -n, this.bg[1] = 255, this.bg[2] = 0; break;
		case 2: this.bg[0] = 0, this.bg[1] = 255, this.bg[2] = n; break;
		case 3: this.bg[0] = 0, this.bg[1] = 255 - n, this.bg[2] = 255; break;
		case 4: this.bg[0] = n, this.bg[1] = 0, this.bg[2] = 255; break;
		case 5: this.bg[0] = 255, this.bg[1] = 0, this.bg[2] = 255 - n; break;
		case 6: this.bg[0] = 255, this.bg[1] = 0, this.bg[2] = 0; break;
	}

	var color = '#';
	color += Number(this.bg[0]).toString(16) == 0 ? '00' : Number(this.bg[0]).toString(16);
	color += Number(this.bg[1]).toString(16) == 0 ? '00' : Number(this.bg[1]).toString(16);
	color += Number(this.bg[2]).toString(16) == 0 ? '00' : Number(this.bg[2]).toString(16);

	this.area.style.background = '-webkit-linear-gradient(-45deg, #fff, '+color+', #000)';
},
ColorPicker.prototype.showPicker = function(){
	this.areaPicker.style.left = this.hsb[1]/100 * (this.area.offsetWidth - this.areaPicker.offsetWidth) + 'px';
	this.areaPicker.style.top = (1- this.hsb[2]/100 ) * (this.area.offsetWidth - this.areaPicker.offsetWidth) + 'px';

	this.tapePicker.style.top = this.hsb[0]/360 * (this.area.offsetHeight - this.areaPicker.offsetHeight) + 'px';
},
ColorPicker.prototype.showColor = function(){
	this.curColor.style.backgroundColor = 'rgb('+this.rgb[0]+', '+this.rgb[1]+', '+this.rgb[2]+')';
},
ColorPicker.prototype.showRgb = function(){
	this.inputs[0].value = this.rgb[0],
	this.inputs[1].value = this.rgb[1],
	this.inputs[2].value = this.rgb[2];
},
ColorPicker.prototype.showHsl = function(){
	this.inputs[3].value = this.hsl[0],
	this.inputs[4].value = this.hsl[1],
	this.inputs[5].value = this.hsl[2];
},
ColorPicker.prototype.changeColor = function(){
	var _this = this,
		height = this.area.offsetHeight - this.areaPicker.offsetHeight,
		width = this.area.offsetWidth - this.areaPicker.offsetWidth,
		oLeft = this.colorPicker.offsetLeft + this.area.offsetLeft,
		oTop = this.colorPicker.offsetTop + this.area.offsetTop;
	this.tape.onmousedown = function(e){
		e.button === 0 && (_this.canMoveTape = true);
	}
	this.area.onmousedown = function(e){
		e.button === 0 && (_this.canMoveArea = true);
	}
	document.onmousemove = function(e){
		if(_this.canMoveTape){
			//bg, num, cur
			var top = e.clientY - oTop;

			top < 0 && (top = 0),
			top > height && (top = height);

			_this.tapePicker.style.top = top + 'px';

			_this.hsb[0] = Math.round(top / height * 360); 

			_this.hsb2rgb(),
			_this.rgb2hsl(),
			_this.showRgb(),
			_this.showHsl(),
			_this.showColor(),
			_this.showBg();
		}
		if(_this.canMoveArea){
			//num, cur
			var left = e.clientX - oLeft,
				top = e.clientY - oTop;

			left < 0 && (left = 0),
			left > width && (left = width),
			top < 0 && (top = 0),
			top > height && (top = height);

			_this.areaPicker.style.top = top + 'px'; 
			_this.areaPicker.style.left = left + 'px';

			_this.hsb[1] = Math.round(left/width * 100),
			_this.hsb[2] = Math.round((height - top)/height * 100);

			_this.hsb2rgb(),
			_this.rgb2hsl(),
			_this.showRgb(),
			_this.showHsl(),
			_this.showColor();
		}
	}
},
ColorPicker.prototype.changeNum = function(){
	var _this = this;

	this.inputs[0].addEventListener('blur', function(){
		if(_this.rgb[0] == parseInt(this.value)){
			return false;
		}else{
			if(error(255, 0, this)){
				_this.rgb[0] = parseInt(this.value);
				change(true);
			}
		}
	});
	this.inputs[1].addEventListener('blur', function(){
		if(_this.rgb[1] == parseInt(this.value)){
			return false;
		}else{
			if(error(255, 0, this)){
				_this.rgb[1] = parseInt(this.value);
				change(true);
			}
		}
	});
	this.inputs[2].addEventListener('blur', function(){this.value = parseInt(this.value);
		if(_this.rgb[2] == parseInt(this.value)){
			return false;
		}else{
			if(error(255, 0, this)){
				_this.rgb[2] = parseInt(this.value);
				change(true);
			}
		}
	});
	this.inputs[3].addEventListener('blur', function(){
		if(_this.hsl[0] == parseInt(this.value)){
			return false;
		}else{
			if(error(360, 0, this)){
				_this.hsl[0] = parseInt(this.value);
				change();
			}
		}
	});
	this.inputs[4].addEventListener('blur', function(){
		if(_this.hsl[1] == parseInt(this.value)){
			return false;
		}else{
			if(error(100, 0, this)){
				_this.hsl[1] = parseInt(this.value);
				change();
			}
		}
	});
	this.inputs[5].addEventListener('blur', function(){
		if(_this.hsl[2] == parseInt(this.value)){
			return false;
		}else{
			if(error(100, 0, this)){
				_this.hsl[2] = parseInt(this.value);
				change();
			}
		}
	});

	function error(max, min, self){
		if(self.value > max || self.value < min){
			self.focus(),
			_this.errorEl = self,
			_this.errorTxt = '取值范围在'+min+'~'+max+'之间',
			_this.showError();
			return false;
		}else return true;
	}
	function change(rgb){
		rgb ? (_this.rgb2hsl(), _this.rgb2hsb(), _this.showHsl())
			: (_this.hsl2rgb(), _this.rgb2hsb(), _this.showRgb()),
		_this.showBg(),
		_this.showPicker(),
		_this.showColor(),
		_this.getColor();
	}
},
ColorPicker.prototype.showError = function(){
	this.errorBox = document.getElementById('errorBox');
	this.errorBox.innerText = this.errorTxt;

	this.errorBox.style.left = this.errorEl.offsetLeft + 10 + 'px';
	this.errorBox.style.top = this.errorEl.offsetTop + 40 + 'px';
	this.errorBox.style.display = 'inline-block';
	setTimeout(function(){
		this.errorBox.style.display = 'none';
	}, 2000)
}



window.onload = function(){
	var colorPicker = new ColorPicker('#D7AEF3');			
}