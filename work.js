var wordcut = require("wordcut");
var text = "ไปโรงพยาบาลเกษมราษฎร์ บางแค"
var request = require('request');

wordcut.init(__dirname+'/customdict.txt',true);
var token = wordcut.cut(text,'|');

var url = 'https://us-central1-aofs-project.cloudfunctions.net/realestateApi/api/v1/projects?search='+token;

console.log(url);
