# TODO

// Hent repository
git clone git@gitlab.au.dk:au577483/p2pvrreality.git

// Åben mappen p2pvrreality

// Start serveren
sudo node index.js

// Følg linket i terminalen for at åbne det korrekte URL (burde være 127.0.0.1:3000)

// Efter 2 sekunder, refresh siden for at få det nyeste data (siden starter med placeholder værdier)

// The End

docker run -ti --privileged -p 3000:3000 --device /dev/gpiomem  sudo_node /bin/sh