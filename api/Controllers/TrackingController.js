'use strict';

var SignalRJS = require('signalrjs'); 
var express = require('express');
var signalR = SignalRJS();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";
var server = express();
exports.TrackEndpoints = function(req, res){
    server.use(signalR.createListener())
    server.use(express.static(__dirname));
    server.listen(3000);
     
    signalR.on('CONNECTED',function(){
        console.log('connected');
        setInterval(function () {
            signalR.send({time:new Date()});
        },1000)
    });
    }

// exports.Tracking = function(req, res){
//     var input = req.body; 
//     console.log('input is:'); 
//     console.log(input);
    
//             MongoClient.connect(url, function(err, db){ 
//                 var dbo = db.db("heroku_zn69xqhf");
//                 var collectionName="CLC_Tracking";
//                 var query = {
//                     TrackID=input.TrackID, 
//                     Latitude : input.Latitude,
//                     Longitude: input.Longitude};
//                 dbo.collection(collectionName).insertOne(query, function(err, result) {
//                     if (err) throw err;
//                     console.log("1 document inserted");
//                     res.json({status : 'success', message : 'OK', result : input});
//                     db.close();
//                   });
//                 });
//         }
