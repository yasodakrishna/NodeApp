'use strict';
module.exports = function (app) {

  var userCtrl = require('../Controllers/UserController');  
  
  //user Routes
  app.route('/userCtrl')
    .get(userCtrl.getUsers);
};
