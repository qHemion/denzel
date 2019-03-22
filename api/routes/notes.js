'use strict';
module.exports = function(app) {
  var controller = require('../controllers/controller.js');

  // todoList Routes
 /* app.route('/movies')
    .get(controller.return_random_movie)*/
	
	app.get('/movies", (request, reponse)=>{})


  /*app.route('/movies/:id')
    .get(controller.return_movie_id)
    .post(controller.add_commentary)
  
  app.route('/movies/populate')
    .get(controller.populate_db)

  app.route('/movies/search')
    .get(controller.search_movie)*/
};

//app.get('/movies", (request, reponse)=>{})