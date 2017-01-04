/**
 * Created by Digz on 02/01/2017.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var port = process.env.PORT || 8080;


app.get('/api', function (req, res) {
    var deviceId = req.param('d');
    var latitude = req.param('a');
    var longitude = req.param('n');
    updateDB(deviceId, longitude, latitude);
    res.send(deviceId + ' ' + longitude + ' ' + latitude);
});

app.post('/api', function (req, res) {
    var deviceId = req.body.d;
    var latitude = req.body.a;
    var longitude = req.body.n;
    updateDB(deviceId, longitude, latitude);
    res.send(deviceId + ' ' + longitude + ' ' + latitude);
});

var admin = require("firebase-admin");

var serviceAccount = require('./json/adminsdk');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cartracker-cc334.firebaseio.com"
    /*databaseAuthVariableOverride:{
        uid : "digz"
    }*/
});
var db = admin.database();
var ref = db.ref("/devices");
function updateDB(deviceId, longitude, latitude) {
    var deviceRef = ref.child(deviceId);
    deviceRef.update({
        "latitude": latitude,
        "longitude": longitude
    });
}



app.listen(port);
console.log('Server started! At http://localhost:' + port);
