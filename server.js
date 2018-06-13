var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),     

    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://192.168.100.23/RMSDB');
mongoose.connect('mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf');
//'mongodb://heroku_r9hn0jzn:echn9ckdip4644i79p2j4blun8@ds129796.mlab.com:29796/heroku_r9hn0jzn');

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
    //res.send("Heroku Demo!");
    mongoose.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Connection established");
        var dbo = db.db("property");
        dbo.collection("CLC_User").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        });
        });
});

app.listen(port);

console.log('Test RESTful API server started on: ' + port); //comment