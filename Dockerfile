FROM arm32v7/node:alpine

RUN apk add --no-cache curl python python-dev gcc g++ make ca-certificates

RUN wget https://github.com/joan2937/pigpio/archive/master.zip && unzip master.zip && cd pigpio-master && rm Makefile && wget https://gist.githubusercontent.com/anders-wiggers/97842072dd2902d52b56b11f2f3b8121/raw/5d5836358d036dd61fc99be66e9c2db653d2c1c5/Makefile && make && make install

RUN apk add nano && apk add sudo

COPY /package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js"]
