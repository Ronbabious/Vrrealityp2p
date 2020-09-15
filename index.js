const gpio = require('onoff').Gpio // #A
const sensorLib = require('node-dht-sensor')
const Gpio = require('pigpio').Gpio;

const trigger = new Gpio(23, {mode: Gpio.OUTPUT});
const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

trigger.digitalWrite(0); // Make sure trigger is low
sensorLib.initialize(11, 12) // #A
const led = new gpio(4, 'out') // #B

const watchHCSR04 = () => {
    let duration;
    const distance = duration*0.034/2;
    console.log(distance);
}

watchHCSR04();
const interval = setInterval(() => { // #C
 let value = (led.readSync() + 1) % 2 // #D
 let readout = sensorLib.read();
 trigger.trigger(10, 1); // Set trigger high for 10 microseconds
 console.log('Temperature izt: ' + readout.temperature.toFixed(2) + 'C, ' + 'Humidity: ' + readout.humidity.toFixed(2) + '%')
 led.write(value, () => { // #E
 })
}, 2000)

process.on('SIGINT', () => { // #F
 clearInterval(interval)
 led.writeSync(0) // #G
 led.unexport()
 console.log('Bye, bye!')
 process.exit()
})
