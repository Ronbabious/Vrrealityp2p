const express = require('express');
const onoff = require('onoff').Gpio;
const pigpio = require('pigpio').Gpio;
const dht = require('node-dht-sensor');
const app = express()


const MICROSECDONDS_PER_CM = 1e6 / 34321;
const trigger = new pigpio(23, { mode: pigpio.OUTPUT });
const echo = new pigpio(24, { mode: pigpio.INPUT, alert: true });

trigger.digitalWrite(0); // Make sure trigger is low
dht.initialize(11, 12); // #A
const led = new onoff(4, 'out'); // #B


var   counter = 0;
var   sonic = 1;
var   temp = 1;
var   humii = 1;

const watchHCSR04 = () => {
    let startTick;

    echo.on('alert', (level, tick) => {
        if (level == 1) {
            startTick = tick;
        } else {
            const endTick = tick;
            const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
            sonic = diff / 2 / MICROSECDONDS_PER_CM;
            console.log('Distance in cm: ' + sonic + '.');
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
    console.log(
        `Temperature: ${temp} C, Humidity: ${humii} %, Counter: ${counter}`);
    led.write(value, () => {
        // #E
    });
}, 2000);

process.on('SIGINT', () => {
    // #F
    clearInterval(interval);
    led.writeSync(0); // #G
    led.unexport();
    console.log('Bye, bye!');
    process.exit();
});









app.get('/', (req, res) => res.send(createResponse()))

app.listen(3000, () => console.log('Server ready'))

function createResponse() {
    var res = `Distance: ${sonic}, Temperature: ${temp} C, Humidity: ${humii} %, Counter: ${counter}`
    console.log(res);
    return res
}