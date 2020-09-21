# TODO

1. Clone repository

   `git clone git@gitlab.au.dk:au577483/p2pvrreality.git --branch milestone1`

2. Open "p2pvrreality"

   `cd p2pvrreality`

3. Start the server

   `sudo node app.js`

4. Følg linket i terminalen for at åbne det korrekte URL (burde være 127.0.0.1:3000)



### If docker is used, use the following command to run the docker image. This opens the terminal and give the correct privileges to docker to acces rpi GPIO.

   docker run -ti --privileged -p 3000:3000 <name_of_image> /bin/sh