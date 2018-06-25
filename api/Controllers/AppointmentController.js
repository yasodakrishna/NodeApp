'use strict';

var autoIncrement = require("mongodb-autoincrement");

var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";

//Sechdule Appointment
exports.SechduleAppointment = function(req, res){
    var input = req.body;   
    // var propid=parseInt(input.PropertyId);
    // // console.log(propid)
    // console.log(typeof(propid))   
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");
                var collectionName="CLC_Appointments";
                autoIncrement.getNextSequence(dbo, collectionName,"AppointmentID", function (err, autoIndex) {
                var query = { 
                    AppointmentID : autoIndex,
                    UserID :input.UserID,
                    PropertyId : parseInt(input.PropertyId),
                   
                    AssignedAgentID : input.AssignedAgentID,
                    Date : input.Date , 
                    Time : input.Time,                    
                    AppointmentStatus : input.AppointmentStatus
                };
                dbo.collection(collectionName).insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                  });
                });
                })
        }

                exports.AcceptAppointment = function(req, res){
                    var input = req.body;                  
                    MongoClient.connect(url, function(err, db){ 
                          var dbo = db.db("heroku_zn69xqhf");
                          var Values = { AppointmentID :parseInt( input.AppointmentID)};
                        //   parseInt(req.body.AppointmentID, 10);
                          console.log(typeof parseInt(Values));
                           var newValues = { 
                               $set: {
                                AppointmentStatus : input.AppointmentStatus,
                                AssignedAgentID : input.AssignedAgentID
                                }
                         };
                          dbo.collection("CLC_Appointments").updateOne(Values, newValues, function(err, result) {
                            if (err) throw err;
                            console.log(err);
                            console.log(input.AppointmentID);
                            res.json({status : 'success', message : 'OK', result : input});
                            console.log("Appointment Accepted Successfully !!");
                            db.close();
                                  });
                              });
                  }