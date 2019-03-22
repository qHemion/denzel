'use strict';
module.exports = function(app) {
  var controller = require('../controllers/controller.js');

  // todoList Routes
  app.route('/movies')
    .get(controller.list_all_tasks)


  app.route('/movies/:id')
    .get(controller.read_a_task)
    .post(controller.update_a_task)
  
  app.route('/movies/populate')
    .get(controller.list_all_tasks)

  app.route('/movies/search')
    .get(controller.list_all_tasks)
};