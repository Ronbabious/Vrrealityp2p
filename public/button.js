console.log("loaded static javascript");


setInterval(function () {
    getDataFromSensor('pi/sensors/', 'pir')
    getDataFromSensor('pi/sensors/', 'temperature')
    getDataFromSensor('pi/sensors/', 'humidity')
    // document.getElementById('temp').append(temperature)
    // document.getElementById('dis').append(distance)
    // document.getElementById('hum').append(humidity)

}, 50000);

function fetchData(api) {
    fetch(api)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response
                response.json()
                    .then(function (data) {
                        //console.log(data.value)
                        return data.value
                    });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

// Example POST method implementation:
async function getDataFromSensor(api, sensor) {
    await fetch(`${api}/${sensor}`)
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            // console.log(response);
            response.json()
                .then(function(data) {
                    var element;
                    switch (sensor) {
                        case "pir":
                            element = document.getElementById('dis')
                            break;
                            
                        case "temperature":
                            element = document.getElementById('temp')
                            break;
                                
                        case "humidity":
                            element = document.getElementById('hum')
                            break;

                        default:
                            console.log("wrong method call or sensor does not exist")
                            break;
                    }
                    element.innerHTML = data.value;
                });
        })
}


async function putData(led, state) {
    // getData('pi/actuators/leds/1', "value");
    // fetchData('/pi/actuators/leds/2/value');
    await fetch('/pi/actuators/leds/' + led, {
        method: "PUT",
        body: JSON.stringify({
            valueOff: led,
            onOff: state,
        }
        ),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })
    .then(response => 
        response.json())
        .then(json => {
            console.log(json);
        })
}

