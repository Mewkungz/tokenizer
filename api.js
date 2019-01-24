var app = require('express')();
var wordcut = require("wordcut");
var port = process.env.PORT || 7777;
var request = require('request');
const utf8 = require('utf8');
var getJSON = require('get-json')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/:text', function (req, res) {
	var text = req.params.text
	wordcut.init(__dirname+'/customdict.txt',true);
	var token = wordcut.cut(text,' ');
	var url = 'https://us-central1-aofs-project.cloudfunctions.net/realestateApi/api/v1/projects?search='+token;
	url = utf8.encode(url);
	//res.redirect(url);
	var result =[];
	getJSON(url, function(error, response){
		result = response ;
    	return res.status(200).send(result)
	});
});


app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});