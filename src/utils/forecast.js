const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e194f5d41d913a8410652c5af18945fe&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log(body)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' .It is currently ' 
            + body.current.temperature+ ' degress out. ' 
            + 'It feels like '+body.current.feelslike
            + '. There is a ' + body.current.precip + '% chance of rain.'
             )
        }
    })
}

module.exports = forecast