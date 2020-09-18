var httpServer = require('./http'),
    resources = require('./resources.json');
//var ledsPlugin1 = require('./plugins/ledPlugin1'),
//    ledsPlugin2 = require('./plugins/ledPlugin2');

    //ledsPlugin1.on

var server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});