const gpio = require('onoff').Gpio; // #A
const sensorLib = require('node-dht-sensor');
const Gpio = require('pigpio').Gpio;

const MICROSECDONDS_PER_CM = 1e6 / 34321;
const trigger = new Gpio(23, { mode: Gpio.OUTPUT });
const echo = new Gpio(24, { mode: Gpio.INPUT, alert: true });
var   sonic = 1;
var   temp = 1;
var   humii = 1;
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(
		'Distance: ' +
			sonic +
			' , Temperature: ' +
			temp +
			'C' +
			', Humidity: ' +
			humii +
			'%'
	);

	trigger.digitalWrite(0); // Make sure trigger is low
	sensorLib.initialize(11, 12); // #A
	const led = new gpio(4, 'out'); // #B

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
		let readout = sensorLib.read();
		trigger.trigger(10, 1); // Set trigger high for 10 microseconds
		temp = readout.temperature.toFixed(2);
		humii = readout.humidity.toFixed(2)
		console.log(
			'Temperature izt: ' +
				readout.temperature.toFixed(2) +
				'C, ' +
				'Humidity: ' +
				readout.humidity.toFixed(2) +
				'%'
		);
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
});
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
