var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");
const fs = require('fs');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://voice-search-1ef4a.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/");
var key =[];
ref.on("value", function(snapshot) {
	for (var i = 0; i <= snapshot.val().length - 1; i++) {
		for (var j = 0; j <= snapshot.val()[i].data.attributes.length - 1; j++) {
			for (var k = 0 ; k <= snapshot.val()[i].data.attributes[j].keywords.keywordsEn.length - 1; k++) {
				key.push(snapshot.val()[i].data.attributes[j].keywords.keywordsEn[k]);
			}
			for (var l = 0 ; l <= snapshot.val()[i].data.attributes[j].keywords.keywordsTh.length - 1; l++) {
				key.push(snapshot.val()[i].data.attributes[j].keywords.keywordsTh[l]);
			}
		}
	}
	for (var i = key.length - 1; i >= 0; i--) {
	fs.appendFile('customdict.txt',key[i]+'\n', function (err) {
  		if (err) throw err;
		});
	}
});



