'use strict';
module.exports = function (app) {

  var userCtrl = require('../Controllers/UserController');  
  
  //user Routes
  app.route('/userCtrl')
    .get(userCtrl.getUsers);
 //user signup Routes
   app.route('/singup')
  .post(userCtrl.signUp);
};
