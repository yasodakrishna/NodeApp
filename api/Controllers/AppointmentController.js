'use strict';

var autoIncrement = require("mongodb-autoincrement");

var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";

//Sechdule Appointment
exports.SechduleAppointment = function(req, res){
    var input = req.body;      
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");
                var collectionName="CLC_Appointments";
                var query = { 
                    UserID :input.UserID,
                    PropertyID : input.PropertyID,
                    AssignedAgentID : input.AssignedAgentID,
                    Date : input.Date , 
                    Time : input.Time,                    
                    AppointmentStatus : input.AppointmentStatus,
                    AppointmentID : input.AppointmentID
                    
                };
                dbo.collection(collectionName).insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                  });
                })
        }

//Accept Appointment
exports.AcceptAppointment = function(req, res){
    var input = req.body;      
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");                
                var value=input.Acceptappointment
                if(value !=null){
                    var query = { Acceptappointment: input.Acceptappointment};
                    dbo.collection("CLC_Appointments").insertOne(query, function(err, result) {
                        if (err) throw err;
                        console.log("Accept document inserted");
                        res.json({status : 'success', message : 'OK', result : input});
                        db.close();
                      });
                }
                else{
                    var query = { $set: { Acceptappointment: input.Acceptappointment}};
                    dbo.collection("CLC_Appointments").updateOne(query, function(err, result) {
                        if (err) throw err;
                        console.log("Accept document inserted");
                        res.json({status : 'success', message : 'OK', result : input});
                        db.close();
                      });
                }
          
            });
        }

        //Cancel Appointment
        exports.CancelAppointment = function(req, res){
            var input = req.body;      
                    MongoClient.connect(url, function(err, db){ 
                        var dbo = db.db("heroku_zn69xqhf");
                        var query = { Cancelappointment: input.Cancelappointment};
                        dbo.collection("CLC_Appointments").insertOne(query, function(err, result) {
                            if (err) throw err;
                            console.log("Cancel document inserted");
                            res.json({status : 'success', message : 'OK', result : input});
                            db.close();
                          });
                    });
                }