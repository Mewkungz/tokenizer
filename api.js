var app = require('express')();
var wordcut = require("wordcut");
var port = process.env.PORT || 7777;
var request = require('request');


app.get('/:text', function (req, res) {
	var text = req.params.text
	wordcut.init(__dirname+'/customdict.txt',true);
	var token = wordcut.cut(text,' ');
	var url = 'https://us-central1-aofs-project.cloudfunctions.net/realestateApi/api/v1/projects?search='+token;
	res.redirect(url);
});


app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});