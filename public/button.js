console.log("loaded static javascript");


setInterval(function () {
    getDataFromSensor('pi/sensors/', 'pir')
    getDataFromSensor('pi/sensors/', 'temperature')
    getDataFromSensor('pi/sensors/', 'humidity')
}, 5000);

// Example POST method implementation:
async function getDataFromSensor(api, sensor) {
    await fetch(`${api}/${sensor}`)
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json()
                .then(function(data) {
                    // Set the correct HTML element with the correct data
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

