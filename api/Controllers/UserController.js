'use strict';

var mongoose = require('mongoose'),
  UsersData = mongoose.model('CLC_User');
// to get all the Buildings information
exports.getUsers = function (req, res) {
  UsersData.find({}, function (err, _UsersData) {
      if (err)
        res.send(err);
      else {
        console.log(_UsersData);
        res.json(_UsersData);
      }
    });
  };