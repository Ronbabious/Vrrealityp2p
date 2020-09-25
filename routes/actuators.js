var ledsPlugin = require('../plugins/ledPlugin');
var express = require('express'),
    router = express.Router(),
    resources = require('../resources.json');

router.route('/').get(function (req, res, next) {
    req.result = resources.pi.actuators;
    next();
});

router.route('/leds').get(function (req, res, next) {
    req.result = resources.pi.actuators.leds;
    next();
});

router.route('/leds/1').get(function (req, res, next) {
    req.result = resources.pi.actuators.leds[1];
    next();
});

router.route('/leds/2').get(function (req, res, next) {
    req.result = resources.pi.actuators.leds[2];
    next();
});

router.route('/leds/1/value').get(function (req, res, next) {
    req.result = resources.pi.actuators.leds[1].value;
    next();
});

router.route('/leds/2/value').get(function (req, res, next) {
    req.result = resources.pi.actuators.leds[2].value;
    next();
});

router.route('/leds/:id').get(function (req, res, next) {
    req.result = resources.pi.actuators.leds[req.params.id];
    next();
}).put(function (req, res, next) {
    var argument = req.body.value;
    var ledID = req.params.id;
    ledsPlugin.on(ledID, argument); // call function of LED plugin with arguments of request
    next();
});

module.exports = router;