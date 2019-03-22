var client=null;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = "mongodb+srv://Quentin:mongopassword@hemionwebapp-fktzw.azure.mongodb.net/test?retryWrites=true";
var collection = null;

module.exports = async () => {
	if(client)
	{
		console.log("dejà un client");
		return client;
	}
	Mclient = new MongoClient(uri, { useNewUrlParser: true });
	client = await Mclient.connect();
	return client;
};