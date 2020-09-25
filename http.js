converter = require('./middleware/converter.js')
var bodyParser = require('body-parser');
var express = require('express'),
    actuatorsRoutes = require('./routes/actuators.js'),
    sensorRoutes = require('./routes/sensors.js'),
    ledPlugin = require('./plugins/ledPlugin.js'),
    //cors = require('cors');

    app = express();

//app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorRoutes);
app.get('/pi', function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
});
app.get('/', function (req, res) {
    console.log("Starting homepage")
    res.sendFile(__dirname + "/public/index.html")
});
app.put('/pi/actuators/leds/1', function (req, res) {
    //ledPlugin.on(req.body.valueOff, req.body.onOff)
    res.sendFile(__dirname + "/resources.json")
})
app.put('/pi/actuators/leds/2', function (req, res) {
    res.sendFile(__dirname + "/resources.json")
})
app.use(converter())

module.exports = app;