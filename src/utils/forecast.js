const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5ea406f3bab02cfed6d2ae6ce4da60d2&query=' + latitude + ',' + longitude
    request({
        url,
        json: true // to convert the response from json string to json object
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)//undefined as on getiing error there will be no response
        } else if (response.body.error) {//if there is improper request
            callback('Unable to find location, try another search', undefined)
        }
        else {
            // console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees in ${response.body.location.region} but it feels like ${response.body.current.feelslike}`)
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees in ${response.body.location.region} but it feels like ${response.body.current.feelslike}`)
        }


    })
}

module.exports = forecast