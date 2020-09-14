const Gpio = require('onoff').Gpio // #A
const sensorLib = require('node-dht-sensor')
const led = new Gpio(4, 'out') // #B
let interval
interval = setInterval(() => { // #C
 let value = (led.readSync() + 1) % 2 // #D
 led.write(value, () => { // #E
 console.log('Changed LED state to: ' + value)
 })
}, 2000)
process.on('SIGINT', () => { // #F
 clearInterval(interval)
 led.writeSync(0) // #G
 led.unexport()
 console.log('Bye, bye!')
 process.exit()
})
sensorLib.initialize(11, 12) // #A
const interval = setInterval(() => { // #B
 read()
}, 2000)


function read () {
 let readout = sensorLib.read() // #C
 console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + // #D
 'humidity: ' + readout.humidity.toFixed(2) + '%')
};
process.on('SIGINT', () => {
 clearInterval(interval)
 console.log('Bye, bye!')
 process.exit()
})
// #A 22 is for DHT11, 12 is the GPIO we connect to on the Pi
// #B create an interval to read the values every 2 seconds
// #C read the sensor values
// #D readout contains two values: temperature and humidity
// #A Import the onoff Gpio library
// #B Initialise pin 4 to be an output pin
// #C This interval will be called every 2 seconds
// #D Synchronously read the value of pin 4 and transform 1 to 0 or 0 to 1
// #E Asynchronously write the new value to pin 4
// #F Listen to the event triggered on CTRL+C
// #G Cleanly close the GPIO pin before exiting