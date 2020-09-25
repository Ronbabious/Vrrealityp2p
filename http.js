converter =
    require('./middleware/converter.js')
var bodyParser = require('body-parser');
var express = require('express'),
    actuatorsRoutes = require('./routes/actuators.js'),
    sensorRoutes = require('./routes/sensors.js'),
    resources = require('./resources.json'),
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
app.use(converter())

module.exports = app;