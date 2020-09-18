var httpServer = require('./http'),
resources = require('./resources.json');

var server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});