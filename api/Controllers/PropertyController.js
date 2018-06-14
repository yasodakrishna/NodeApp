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
                    Zip: Number(input.Zip),
                    Photos:input.Photos,
                    Price:input.Price,
                    Property_Status:input.Property_Status,
                    Possession:input.Possession,
                    Age_of_Property:input.Age_of_Property,
                    ListedBy:input.ListedBy,
                    Aminities:input.Aminities,
                    Facilities:input.Facilities,
                    Bathrooms:Number(input.Bathrooms),
                    Facing:input.Facing,
                    IsFavorite: input.IsFavorite,
                    Parking:Number(input.Parking),
                    BuildUp_Area:Number(input.BuildUp_Area),
                    Floor_Type:input.Floor_Type,
                    Balconies:Number(input.Balconies),
                    Property_Description:input.PropertyDescription};
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
                var Propertyidval={ UserID: input.UserID };
                console.log('userid is ' );
                console.log(Propertyidval);
                var query = { $set: { 
                    Property_Type : input.Property_Type,
                    BHKType : input.BHKType,
                    Location: input.Location,
                    Zip: Number(input.Zip),
                    Photos:input.Photos,
                    Price:money.Price(input.Price),
                    Property_Status:input.Property_Status,
                    Possession:input.Possession,
                    Age_of_Property:input.Age_of_Property,
                    ListedBy:input.ListedBy,
                    Aminities:input.Aminities,
                    Facilities:input.Facilities,
                    Bathrooms:Number(input.Bathrooms),
                    Facing:input.Facing,
                    Parking:Number(input.Parking),
                    BuildUp_Area:Number(input.BuildUp_Area),
                    Floor_Type:input.Floor_Type,
                    Balconies:Number(input.Balconies),
                    Property_Description:input.PropertyDescription}};
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
          dbo.collection("CLC_Property").find(newValues, function(err, res) {
            if (err) throw err;
            console.log("Got one record Successfully !!");
            db.close();
          });
    });
}

//Get PropertyList
exports.GetProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
          //var email = { Email : input.Email };
           var newValues = { 
               Location : input.Location , 
                Property_Type : input.Property_Type,
                BHKType: input.BHKType
            };
          dbo.collection('CLC_Property').find(newValues).toArray(function(err,result){
            if (err) throw err;
            console.log(result.length);
            if(result.length == 1){
                res.json({status : 'success', message : 'Records found', result : result});
            }
            else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
        })
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
            if(result.length == 1){
                res.json({status : 'success', message : 'Records found', result : result});
            }
            else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
        })
    });
}

//Make Favorite Property List
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
            IsFavorite:input.IsFavorite
                }
            };
            dbo.collection("CLC_Property").updateOne(oldvalues, newValues, function(err, res) {
            if (err) throw err;
            console.log(input.IsFavorite);
            console.log("User Favorite Updated Successfully !!");
            db.close();
            });
    });
}

//Get Favorite Property List
exports.GetFavoriteProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
           var newValues = {UserID: input.UserID,IsFavorite:input.IsFavorite};
          dbo.collection('CLC_Property').find(newValues).toArray(function(err,result){
            if (err) throw err;
            console.log(result.length);
            if(result.length == 1){
                res.json({status : 'success', message : 'Records found', result : result});
            }
            else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
        })
    });
}
