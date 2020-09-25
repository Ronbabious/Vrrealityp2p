var resources = require('../resources');
//var pluginName = resources.pi.sensors.pir.name;
const onoff = require('onoff').Gpio;

const led1 = new onoff(2, 'out');
const led2 = new onoff(22, 'out');



//start and stop plugin, make it exportable to other node.js files
exports.on = function (led, valueLED) {
    resources.pi.actuators.leds[led].value = valueLED;


    //Change state of corresponding LED
    if (led == 1) {
        led1.write(valueLED ? 1 : 0);
    }
    else if (led == 2) {
        led2.write(valueLED ? 1 : 0);
    }

    console.info(`Turned ${valueLED ? "on" : "off"} led ${led}`);
};