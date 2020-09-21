# TODO

1. Clone repository

   `git clone git@gitlab.au.dk:au577483/p2pvrreality.git --branch milestone1`

2. Open "p2pvrreality"

   `cd p2pvrreality`

3. Install depedencies using npm
   
   `npm install`

4. Start the server

   `sudo node app.js`

5. Connect to <localIP_of_rpi>:3000 (as long as the machine conencting is on the same network at the raspberry pi) on your prefered browser



### If docker is used, use the following command to run the docker image. This opens the terminal and give the correct privileges to docker to acces rpi GPIO.

   `docker run -ti --privileged -p 3000:3000 <name_of_image> /bin/sh`