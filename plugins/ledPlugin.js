var resources = require('../resources');
//var pluginName = resources.pi.sensors.pir.name;
const onoff = require('onoff').Gpio;

const led1 = new onoff(2, 'out');
const led2 = new onoff(22, 'out');



//start and stop plugin, make it exportable to other node.js files
exports.on = function (led) {
    if(led == 1){        
        var ledVal = resources.pi.actuators.leds[1].value;    
        ledVal = !ledVal;    
        resources.pi.actuators.leds[1].value = ledVal;


        led1.write(ledVal ? 1:0);

        var val = ledVal ? "on":"off";
        console.info(`Turned ${val} led ${led}`);
    }
    if(led == 2){
        var ledVal = resources.pi.actuators.leds[2].value;
        ledVal = !ledVal;        
        resources.pi.actuators.leds[2].value = ledVal;

        led2.write(ledVal ? 1:0);

        var val = ledVal ? "on":"off";
        console.info(`Turned ${val} led ${led}`);
    }
};