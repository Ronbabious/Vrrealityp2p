var resources = require('./../../resources.json');
const dht = require('node-dht-sensor');
dht.initialize(11, 12)

exports.on = function (temp, humi) {
    resources.pi.sensors.dht11.humidity = humi;
    resources.pi.sensors.dht11.temperature = temp

    const interval = setInterval(() => { // #B
        read()
    }, 2000)

}

function read() {
    let readout = dht.read() // #C
    console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + // #D
        'humidity: ' + readout.humidity.toFixed(2) + '%')
};

clearInterval(interval)

