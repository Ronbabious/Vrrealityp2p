var httpServer = require('./http'),
    resources = require('./resources.json');
//var ledsPlugin1 = require('./plugins/ledPlugin1'),
//    ledsPlugin2 = require('./plugins/ledPlugin2');

    //ledsPlugin1.on

var server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});


// curl -i -H "Content-Type: application/json" \
// -H "Accept: application/json" \
// -X PUT 'http://192.168.43.168:3000/pi/actuators/leds/1' \
// -d '{"value":true}'