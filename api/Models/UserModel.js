'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;


var User = new mongoose.Schema({
    Email: {
        type: String,
        required: 'Email is required'
    },
    Password: {
        type: String,
        required: 'Address1 is required'
    },
    UserType: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('CLC_User', User);