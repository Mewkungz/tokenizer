'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('response.json','utf8');  
let data = JSON.parse(rawdata);
var key = [];
for (var i = 0 ; i <= data.length - 1; i++) {
	for (var j =0 ; j <= data[i].data.attributes.length - 1; j++) {
	 	for (var k = 0; k <= data[i].data.attributes[j].keywords.keywordsTh.length - 1; k++) {
	 		key.push(data[i].data.attributes[j].keywords.keywordsTh[k]);
	 	}
	 	for (var l = 0; l <= data[i].data.attributes[j].keywords.keywordsEn.length - 1; l++) {
	 		key.push(data[i].data.attributes[j].keywords.keywordsEn[l]);
	 	}
	}
}
for (var i = key.length - 1; i >= 0; i--) {
	fs.appendFile('customdict.txt',key[i]+'\n', function (err) {
  		if (err) throw err;
	});
}
