converter = require('./middleware/converter.js')
var bodyParser = require('body-parser');
var express = require('express'),
    actuatorsRoutes = require('./routes/actuators.js'),
    sensorRoutes = require('./routes/sensors.js'),
    ledPlugin = require('./plugins/ledPlugin.js'),
    resources = require('./resources.json');
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

// app.put('/pi/actuators/leds/1', function (req, res) {
//     //ledPlugin.on(req.body.valueOff, req.body.onOff)
//     console.log("printing 1")
//     res.sendFile(__dirname + "/resources.json")
// })
// app.put('/pi/actuators/leds/2', function (req, res) {
//     console.log(req.body.valueOff)
//     res.sendFile(__dirname + "/resources.json")
// })

app.put('/pi/actuators/leds/:id', function (req, res) {
        resources.pi.actuators.leds[req.body.valueOff].value = req.body.onOff // If changing values are succesful
        console.log("i think it works")
        console.log(`resources: ${resources.pi.actuators.leds[req.body.valueOff].value}, request: ${req.body.onOff}`);
        res.send(JSON.stringify(resources.pi.actuators.leds[req.body.valueOff].value));
})

// app.put('/pi/actuators/leds/2/value', function (req, res) {
//     console.log("printing request");
//     console.log(req);
//     // resources.pi.actuators.leds[2].value;
//     res.sendFile(__dirname + "/resources.json")
// })
app.use(converter())

module.exports = app;