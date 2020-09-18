var resources = require('./resources');
//var pluginName = resources.pi.sensors.pir.name;
const onoff = require('onoff').Gpio;

const led = new onoff(22, 'out');


//start and stop plugin, make it exportable to other node.js files
exports.on = function () {
    led.write(1);
};
exports.off = function () {
    led.write(0);
    //console.info('%s plugin stopped!', pluginName);
};