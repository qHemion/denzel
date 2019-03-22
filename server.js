var express = require('express'),
app = express(),
port = process.env.PORT || 9292;
var fs = require("fs");
const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const getClient = require('./get_client.js');
const graphqlHTTP = require('express-graphql');
const {GraphQLSchema} = require('graphql');

const {queryType} = require('./query.js');
const schema = new GraphQLSchema({ query: queryType });


//const db = require('./database');

var db = null;;
var collection = null;

async function init() {
	try{
		db = await getClient();
		if(db == null)
			console.log("attention_null");
		collection = db.db("test").collection('denzel');
		
		app.use('/graphql', graphqlHTTP({
		schema: schema,
		graphiql: true,
		context: {
			db: collection
		}
		}));
		
		app.listen(port, ()=>{
			console.log('todo list RESTful API server started on: ' + port);
		});

	} catch (error) {
		console.error(error);
	}
}


async function sandbox (actor) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);

	return movies;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}




app.get("/movies/populate", async (req, res) => {
	
	
	collection
		.deleteMany({});
	var content = await sandbox(DENZEL_IMDB_ID);
	collection
		.insertMany(content);
	res.send(content);
});

app.get("/movies", async (req, res) => {

	collection
		.aggregate([
		{$match : { "metascore" : {$gte : 70}}},
		{ $sample: { size: 1 } }])
		.toArray(function(err, docs) {
	res.send(docs);
	});
	
});

app.get("/debug", async (req, res) => {

	collection
		.aggregate([
		{$match : { "metascore" : {$gte : 70}}},
		{ $sample: { size: 1 } }])
		.toArray(function(err, docs) {
	res.send(docs.title);
	});
	
});

app.get("/movies/populate", (req, res) => {
	res.json(["Wow !"]);
});

app.get("/movies/search", (req, res) => {
	var meta = req.query.metascore;
	if(meta==undefined) meta = 0;
	else meta = parseInt(meta);
	var limit = req.query.limit;
	if(limit==undefined) limit = 5;
	else limit = parseInt(limit);
	
	collection
		.aggregate([
		{$match : {"metascore" : {$gte : meta}}},
		{$sort : { "metascore" : -1} },
		{$limit : limit }])
		.toArray(function(err, docs) {
		res.send(docs);
	});
});


app.get("/movies/:id", (req, res) => {
	var id = req.params.id;
	collection
		.find({"_id" : id})
		.toArray(function(err, docs) {
	res.send(docs);
	});
});

app.post("/movies/:id", (req, res) => {
	var id = req.params.id;
	var review = req.body.review;
	if(review==undefined) review = "No Review";
	var date = req.body.date;
	if(date==undefined) review = "No Date";
	
	//	print(review);
	collection
		.updateOne({"_id" : id}, {$set : { "review" : review, "date" : date } },  {multi: true });
	collection
		.find({"_id" : id})
		.toArray(function(err, docs) {
	res.send(docs);
	});
});




//
  
 

/*process.on( 'SIGTERM', function() {
	
	server.close(function (){
		console.log("shutting down");
	});
}*/

init();




//const {env} = process;
