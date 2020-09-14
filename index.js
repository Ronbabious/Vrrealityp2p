const Gpio = require('onoff').Gpio // #A
const sensorLib = require('node-dht-sensor')

sensorLib.initialize(11, 12) // #A
const led = new Gpio(4, 'out') // #B

const interval = setInterval(() => { // #C
 let value = (led.readSync() + 1) % 2 // #D
 let readout = sensorLib.read();
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
