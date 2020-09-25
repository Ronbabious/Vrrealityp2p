const onoff = require('onoff').Gpio;
const pigpio = require('pigpio').Gpio;
const dht = require('node-dht-sensor');
var resources = require('./resources.json');


var httpServer = require('./http'),
    resources = require('./resources.json');
const { resource } = require('./http');

var server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});

const MICROSECDONDS_PER_CM = 1e6 / 34321;
const trigger = new pigpio(23, { mode: pigpio.OUTPUT });
const echo = new pigpio(24, { mode: pigpio.INPUT, alert: true });

trigger.digitalWrite(0); // Make sure trigger is low
dht.initialize(11, 12); // #A
const led = new onoff(4, 'out'); // #B

const hostname = 'localhost';
const port = 3000;


var counter = 0;
var sonic = 1;
var temp = 1;
var humii = 1;

const watchHCSR04 = () => {
    let startTick;

    echo.on('alert', (level, tick) => {
        if (level == 1) {
            startTick = tick;
        } else {
            const endTick = tick;
            const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
            sonic = diff / 2 / MICROSECDONDS_PER_CM;
            resources.pi.sensors.pir.value = sonic;
            //console.log('Distance in cm: ' + sonic + '.');
        }
    });
};

watchHCSR04();



const interval = setInterval(() => {
    // #C
    let value = (led.readSync() + 1) % 2; // #D
    let readout = dht.read();
    counter++
    trigger.trigger(10, 1); // Set trigger high for 10 microseconds
    temp = readout.temperature.toFixed(2);
    humii = readout.humidity.toFixed(2)
    resources.pi.sensors.dht11.humidity.value = humii;
    resources.pi.sensors.dht11.temperature.value = temp;
    //console.log(
    //    `Temperature: ${temp} C, Humidity: ${humii} %, Counter: ${counter}`);
}, 2000);

process.on('SIGINT', () => {
    // #F
    clearInterval(interval);
    led.writeSync(0); // #G
    led.unexport();
    console.log('Bye, bye!');
    process.exit();
});

// curl -i -H "Content-Type: application/json" \
// -H "Accept: application/json" \
// -X PUT 'http://192.168.43.168:3000/pi/actuators/leds/1' \
// -d '{"value":true}'