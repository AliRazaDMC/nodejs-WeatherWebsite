const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3249a892c4d7a66cca03b96f11302c52&query='+latitude+','+longitude;

    request({ url, json: true}, (error, { body }) => {
        if(error && error.code === 'ENOTFOUND'){
            callback('Please check your internet connectiong. Application is unable to connect to server!', undefined);
        } else if(body.error) {
            callback('Unable to find a city. Kindly provide a valid input!', undefined);
        } /* else if(response.body.error.code === 601) {
            console.log('Empty input. Please specify a location name.');
        } */ else {
            const base = body.current;
            const location = body.location;

            callback(undefined, {
                weatherDescription: base.weather_descriptions[0],
                temperature: base.temperature,
                feelslike: base.feelslike,
                area: location.name,
                region: location.region,
                country: location.country
            });

            // callback(undefined, 'Today weather is '+ base.weather_descriptions[0] +'. It is currently '+ base.temperature +' degree out. It feels like '+ base.feelslike +' degree out.');
            // callback(undefined, 'City: '+location.name+'. Region: '+location.region+'. Country: '+location.country+'.');
        }
    });
}

module.exports = forecast