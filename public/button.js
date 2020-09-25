console.log("loaded static javascript");


setInterval(function () {
    var distance = fetchData('pi/sensors/pir', 'value')
    var temperature = fetchData('pi/sensors/temperature', 'value')
    var humidity = fetchData('pi/sensors/humidity', 'value')
    document.getElementById('temp').append(temperature)
    document.getElementById('dis').append(test)
    document.getElementById('hum').append(humidity)

}, 5000);

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
                        console.log(data)
                        return data.value
                    });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

// Example POST method implementation:

// fetch(`pi/actuators/leds/1/value`)
//     .then(function(response) {
//         console.log(response);
//         response.json()
//             .then(function(data) {
//                 console.log(data);
//             });
//     })

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
    }).then(response => response.json()).then(json => {
        console.log(json);
    })
}

