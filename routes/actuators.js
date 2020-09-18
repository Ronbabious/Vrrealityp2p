var express = require('express'),
    router = express.Router(),
    resources = require('../resources.json');

router.route('/').get(function (req, res, next) {
    res.send(resources.pi.actuators);
});

router.route('/leds').get(function (req, res, next) {
    res.send(resources.pi.actuators.leds);
});

router.route('/leds/1').get(function (req, res, next) {
    res.send(resources.pi.actuators.leds[1]);
});

router.route('/leds/1/value').get(function (req, res, next) {
    res.send(resources.pi.actuators.leds[1].value);
});

module.exports = router;