var resources = require('../resources');
//var pluginName = resources.pi.sensors.pir.name;
const onoff = require('onoff').Gpio;

const led1 = new onoff(2, 'out');
const led2 = new onoff(22, 'out');



//start and stop plugin, make it exportable to other node.js files
exports.on = function (led) {
    if(led == 1){
        led1.write(1);
        console.info(`Turned on led ${led}`);
    }
    if(led == 2){
        led2.write(1);
        console.info(`Turned on led ${led}`);
    }
};
exports.off = function (led) {
    if(led == 1){
        led1.write(0);
        console.info(`Turned off led ${led}`);
    }
    if(led == 2){
        led2.write(0);
        console.info(`Turned off led ${led}`);
    }
    //console.info('%s plugin stopped!', pluginName);
};