# TODO

1. Clone repository

<<<<<<< HEAD
   `git clone git@gitlab.au.dk:au577483/p2pvrreality.git --branch milestone1`
=======
   `git clone git@gitlab.au.dk:au577483/p2pvrreality.git --branch milestone2`
>>>>>>> johansiundAron

2. Open "p2pvrreality"

   `cd p2pvrreality`

3. Install depedencies using npm
   
   `npm install`

4. Start the server

<<<<<<< HEAD
   `sudo node app.js`
=======
   `sudo node wot-server.js`
>>>>>>> johansiundAron

5. Connect to <localIP_of_rpi>:3000 (as long as the machine conencting is on the same network at the raspberry pi) on your prefered browser



<<<<<<< HEAD
### If docker is used, use the following command to run the docker image. This opens the terminal and give the correct privileges to docker to acces rpi GPIO.

   `docker run -ti --privileged -p 3000:3000 <name_of_image> /bin/sh`
=======



To show sensor values: 
<localIP_of_rpi>:3000/pi/sensors/pir
and
<localIP_of_rpi>:3000/pi/sensors/dht11


LED's can be changed with following PUT request from seperate terminal:

Turn on green LED:
curl -i -H "Content-Type: application/json" \
-H "Accept: application/json" \
-X PUT 'http://<localIP_of_rpi>:3000/pi/actuators/leds/1' \
-d '{"value":true}'

Turn off green LED:
curl -i -H "Content-Type: application/json" \
-H "Accept: application/json" \
-X PUT 'http://<localIP_of_rpi>:3000/pi/actuators/leds/1' \
-d '{"value":false}'

Turn on red LED:
curl -i -H "Content-Type: application/json" \
-H "Accept: application/json" \
-X PUT 'http://<localIP_of_rpi>:3000/pi/actuators/leds/2' \
-d '{"value":true}'

Turn off red LED:
curl -i -H "Content-Type: application/json" \
-H "Accept: application/json" \
-X PUT 'http://<localIP_of_rpi>:3000/pi/actuators/leds/2' \
-d '{"value":false}'


To show values of LED:
http://<localIP_of_rpi>:3000/pi/actuators/leds/1
and 
http://<localIP_of_rpi>:3000/pi/actuators/leds/2
>>>>>>> johansiundAron
