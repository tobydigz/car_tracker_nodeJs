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
    var deviceId = req.param('deviceId');
    var latitude = req.param('lat');
    var longitude = req.param('lng');
    updateDB(deviceId, longitude, latitude);
    res.send(deviceId + ' ' + longitude + ' ' + latitude);
});

app.post('/api', function (req, res) {
    var deviceId = req.body.deviceId;
    var latitude = req.body.lat;
    var longitude = req.body.lng;
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