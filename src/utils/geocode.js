const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9oYW1tZWRrYW1sZSIsImEiOiJja25qaWhxb2cwMWswMm9wbjM0cGpxemxqIn0.ukNUraSNPF_Ph5dmvM5IZw&limit=1';
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)//undefined as on getiing error there will be no response
        } else if (response.body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}



module.exports = geocode
