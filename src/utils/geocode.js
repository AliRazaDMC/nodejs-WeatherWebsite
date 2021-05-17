const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWxpcmF6YWRtYyIsImEiOiJja285cjNoODQyeXlhMndtdjNjcDk5N2s5In0.boR8AmsvidsjNYz_Hu9ZBw&limit=1';

    request({url, json: true}, (error, { body }) => {
        // console.log(response.body.features);
        if(error){
            callback('Unable to connect to server. Kindly check your internet connection.', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search!',undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
                location2: body.query[0]
            });
        }
    });
}

module.exports = geocode;