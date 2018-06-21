'use strict';

var autoIncrement = require("mongodb-autoincrement");

var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";

    //create PropertyList
exports.CreateProperty = function(req, res){
    var input = req.body;      
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");
                var collectionName="CLC_Property";
                autoIncrement.getNextSequence(dbo, collectionName,"PropertyId", function (err, autoIndex) {
                var query = { 
                    PropertyId : autoIndex,
                    UserID:input.UserID,
                    Property_Type : input.Property_Type,
                    BHKType : input.BHKType,
                    Location: input.Location,
                    Address : input.Address,
                    Longitude :input.Longitude,
                    Latitude :input.Latitude,
                    Zip: input.Zip,
                    Photos:input.Photos,
                    Price:input.Price,
                    Property_Status:input.Property_Status,
                    Possession:input.Possession,
                    Age_of_Property:input.Age_of_Property,
                    ListedBy:input.ListedBy,
                    Aminities:input.Aminities,
                    Facilities:input.Facilities,
                    Bathrooms:input.Bathrooms,
                    Facing:input.Facing,
                    IsFavorite: input.IsFavorite,
                    Parking:input.Parking,
                    BuildUp_Area:input.BuildUp_Area,
                    Floor_Type:input.Floor_Type,
                    Balconies:input.Balconies,
                    Property_Description:input.PropertyDescription,
                    Address:input.Address};
                dbo.collection(collectionName).insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                  });
                });
                });
        }

        //Update PropertyList
exports.UpdateProperty = function(req, res){
    console.log('went into update')
    var input = req.body;      
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");
                var Propertyidval={ UserID: input.UserID,PropertyId:parseInt(input.PropertyId) };
                console.log('userid is ' );
                console.log(Propertyidval);
                var query = { $set: { 
                    Property_Type : input.Property_Type,
                    BHKType : input.BHKType,
                    Location: input.Location,
                    Address : input.Address,
                    Longitude :input.Longitude,
                    Latitude :input.Latitude,
                    Zip: input.Zip,
                    Photos:input.Photos,
                    Price:input.Price,
                    Property_Status:input.Property_Status,
                    Possession:input.Possession,
                    Age_of_Property:input.Age_of_Property,
                    ListedBy:input.ListedBy,
                    Aminities:input.Aminities,
                    Facilities:input.Facilities,
                    Bathrooms:input.Bathrooms,
                    Facing:input.Facing,
                    Parking:input.Parking,
                    BuildUp_Area:input.BuildUp_Area,
                    Floor_Type:input.Floor_Type,
                    Balconies:input.Balconies,
                    Property_Description:input.PropertyDescription,
                    Address:input.Address}};
                dbo.collection("CLC_Property").updateOne(Propertyidval,query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document Updated");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                  });
            });
        }

        //GetBookingPropertyList
        exports.GetBookingProperty = function(req, res){
            var input = req.body;
            MongoClient.connect(url, function(err, db){ 
                  var dbo = db.db("heroku_zn69xqhf");
                   var newValues = {UserID : input.UserID};
                   console.log(newValues);
                  dbo.collection("CLC_Appointments").find(newValues).toArray(function(err, result) {
                    if (err) throw err;
                    //console.log(result.);
                    console.log(result.length);
                    if(result !=null){
                        console.log("Got one record Successfully !!");
                    res.json({status : 'success', message : 'Records found', result : result});
                    } else{
                        res.json({status : 'error', message : 'No records found', result : null});
                    }
                    db.close();
                  });
            });
        }
//Get PropertyList
exports.GetProperty = function(req, res){

    var input = req.body;
    var newValues;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
          //var email = { Email : input.Email };
          if(parseInt(input.Location)) {
             newValues = { 
                 Zip : input.Location , 
                 Property_Type : input.Property_Type,
                 BHKType: input.BHKType,
 
             };
            
             // {$or: [{Location:''},{Property_Type:'Villa'}]}
                dbo.collection('CLC_Property').find({$or: [{Zip:newValues.Location},{Property_Type:newValues.Property_Type},{BHKType:newValues.BHKType}]}).toArray(function(err,result){
                    if (err) throw err;
                    console.log(result.length);
                    if(result.length>0){
                        res.json({status : 'success', message : 'Records found', result : result});
                    }
                    else{
                        res.json({status : 'error', message : 'No records found', result : null});
                    }
                })
           }
           else {
             newValues = { 
                Location : input.Location , 
                 Property_Type : input.Property_Type,
                 BHKType: input.BHKType,
 
             };
             var loc= newValues.Location;
             console.log(loc)
             dbo.collection('CLC_Property').find({$or: [{Location:new RegExp(loc ,'i')},{Property_Type:newValues.Property_Type},{BHKType:newValues.BHKType}]}).toArray(function(err,result){
                    if (err) throw err;
                    console.log(result.length);
                    if(result!=null){
                        res.json({status : 'success', message : 'Records found', result : result});
                    }
                    else{
                        res.json({status : 'error', message : 'No records found', result : null});
                    }
                })
           }
    });
}

//GetSelling PropertyList
exports.GetSellingProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
           var newValues = {UserID: input.UserID};
          dbo.collection('CLC_Property').find(newValues).toArray(function(err,result){
            if (err) throw err;
            console.log(result.length);
            if(result!=null){
                res.json({status : 'success', message : 'Records found', result : result});
            }
            else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
        })
    });
}
//Get Favorite Property List
exports.GetFavoriteProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
           var newValues = {UserID: input.UserID,IsFavorite:input.IsFavorite,PropertyId:input.PropertyId};
          dbo.collection('CLC_Property').find(newValues).toArray(function(err,result){
            if (err) throw err;
            console.log(result.length);
            if(result!=null){
                res.json({status : 'success', message : 'Records found', result : result});
            }
            else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
        })
    });
}

exports.GetAllBookingProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
           var newValues = {AppointmentStatus : input.AppointmentStatus};
           console.log(newValues);
          dbo.collection("CLC_Appointments").find(newValues).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.length);
            if(result !=null ){
                console.log("Got one record Successfully !!");
            res.json({status : 'success', message : 'Records found', result : result});
            } else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
            db.close();
          });
    });
}
exports.MakeFavoriteProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
          var oldvalues={ 
            UserID: input.UserID, 
            PropertyId:input.PropertyId,
            }
           var newValues = {
            $set: {
            IsFavorite:input.IsFavorite,

                }
            };
            dbo.collection("CLC_Isfavorite").updateOne(oldvalues, newValues, function(err, res) {
            if (err) throw err;
            console.log(input.IsFavorite);
            console.log("User Favorite Updated Successfully !!");
            db.close();
            });
    });
}

//View Property
exports.GetgeneralProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
           var newValues = {PropertyId:parseInt(input.PropertyId)};
          dbo.collection('CLC_Property').find(newValues).toArray(function(err,result){
            if (err) throw err;
            console.log(result.length);
            if(result!=null){
                res.json({status : 'success', message : 'Records found', result : result});
            }
            else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
        })
    });
}








// exports.sample = function(req, res){
//     var input = req.body;
//     MongoClient.connect(url, function(err, db){ 
//         if (err) throw err;
//           var dbo = db.db("heroku_zn69xqhf");
//           dbo.collection('CLC_Isfavorite').aggregate([
//               {
//                   $lookup: 
//                   {
//                       from: 'CLC_Property',
//                       localField:'PropertyId',
//                       foreignField:'PropertyId',
//                       as:'propertyfavorites'
//                     }
//                 }
//                 ]).toArray(function(err,result){
//                     if (err) throw err;
//                     console.log(JSON.stringify(result))
//                     db.close();
//                 })
//     });
// }