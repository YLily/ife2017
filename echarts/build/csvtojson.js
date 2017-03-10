const path = require('path')
const fs = require("fs")

const csv=require('csvtojson')

var rootPath = path.resolve(__dirname, '..');
const csvFilePath= path.join(rootPath, 'src/sp500hst.txt');

var arr = [];

csv()
.fromFile(csvFilePath)
.on('json',(jsonObj, index)=>{
	if(jsonObj.Ticker === 'A'){
		arr[index] = jsonObj;
	}
})
.on('done',(error)=>{
    fs.writeFile(path.join(rootPath,'src/data.json'), JSON.stringify(arr));
})
