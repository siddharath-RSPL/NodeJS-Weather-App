//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('postman-request');
// now we are implemeting callback function with the help we execute API.
// creating function for resuablity.

const forecast = (lat,long, callback) => {
  const apiUrL = 'http://api.weatherstack.com/current?access_key=ec5c169a57fcda399c02565b356275de&query='+lat+','+long+'&units=f'; 
  request(apiUrL, { json: true }, function (error, {body}) {
    if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                tempautre:  'temperature is: ' + body.current.temperature

            })
        }

    });

}


module.exports = forecast;





