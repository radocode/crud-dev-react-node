'use strict';

module.exports = function (app) {
  var userController = require('../controllers/userController');
  var ticketController = require('../controllers/ticketController');

  // Login
  app.route('/login')
  .post(userController.login_user);

  // User Routes
  app.route('/user')
    .get(userController.read_a_user)
    .post(userController.create_a_user);

  // Ticket routes
  app.route('/tickets')
    .get(ticketController.list_all_tickets);

  app.route('/ticket/:ticketId')
    .post(ticketController.create_a_ticket)
    .put(ticketController.update_a_ticket)
    .delete(ticketController.delete_a_ticket);
};