'use strict'

console.log("loaded static javascript");

// setInterval(function () {
//     fetchData('pi/sensors/dist', 'distance')
//     fetchData('pi/sensors/temperature', 'temp')
//     fetchData('pi/sensors/humidity', 'humid')
// }, 1000);
// fetchData('pi/sensors/dist', 'distance')
// fetchData('pi/sensors/temperature', 'temp')
// fetchData('pi/sensors/humidity', 'humid')

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

async function putData(led) {
    // const response = await fetch(`pi/actuators/leds/1`, {
    //     method: 'PUT',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     redirect: 'follow',
    //     body: JSON.stringify(true)
    // });
    const response = await fetch('pi/actuators/leds/1', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(true)
    })

    return response.json();
    // return response.json(); // parses JSON response into native JavaScript objects
}
