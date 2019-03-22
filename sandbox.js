/* eslint-disable no-console, no-process-exit */
const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';
var fs = require('fs');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 9292;

async function sandbox (actor) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);
    const awesome = movies.filter(movie => movie.metascore >= 77);

    console.log(`🍿 ${movies.length} movies found.`);
    console.log(JSON.stringify(movies, null, 2));
	fs.writeFileSync('data/movies.json', JSON.stringify(movies), 'utf8', function (err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	}); 


	
	console.log(`🥇 ${awesome.length} awesome movies found.`);
    console.log(JSON.stringify(awesome, null, 2));
	fs.writeFileSync('data/awesome.json', JSON.stringify(awesome), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

await(sandbox(DENZEL_IMDB_ID));

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
