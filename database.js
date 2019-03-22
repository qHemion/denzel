var client=null;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = "mongodb+srv://Quentin:m6x2q7t9@hemionwebapp-fktzw.azure.mongodb.net/test?retryWrites=true";
var ans = null;

module.exports = async () => {
	client = new MongoClient(uri, { useNewUrlParser: true });
	await client.connect(err => {
	  assert.equal(null, err);
	  console.log("Connected successfully to server");
	  collection = client.db("test").collection('denzel');;
	  collection.find({"rating" : 6.6}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs);
		ans = docs;
		});
	  client.close();
	});
	return ans;
};