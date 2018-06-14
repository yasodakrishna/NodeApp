var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),     
    //http = require('http'),
    bodyParser = require('body-parser');
   
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";

//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://192.168.100.23/RMSDB');
//var url1 = mongoose.connect("mongodb://krishnamongo:k9550793089@ds153460.mlab.com:53460/property")
//mongoose.connect('mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf');
//'mongodb://heroku_r9hn0jzn:echn9ckdip4644i79p2j4blun8@ds129796.mlab.com:29796/heroku_r9hn0jzn');

// MongoClient.connect(url, function(err, db){ 
//     if (err) throw err;
//   var dbo = db.db("property");
//   dbo.collection("CLC_User").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.Email);
//     db.close();
//   });  
// });

User = require('./api/Models/UserModel'),

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set up a URL route
app.get("/", function (req, res) {
    res.send("Heroku Demo!");    
});

var routes = require('./api/routers/routers');
routes(app);

app.listen(port);

console.log('Test RESTful API server started on: ' + port); //comment