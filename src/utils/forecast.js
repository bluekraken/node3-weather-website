const got = require('got');

const forecast = async (latitude, longitude, callback) => {
    const accessKey='a5708b2ae86937b0df406ac6248d2173';
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}`;

    try {
        const response = await got(url);
        if (response.statusCode === 200) {
            const data = JSON.parse(response.body);
            const description = data.current.weather_descriptions[0];
            const temperature = data.current.temperature;
            const feelsLike = data.current.feelslike;
            callback(undefined, `${description}: it's ${temperature}C out, but it feels like ${feelsLike}C!`);
        } else {
            callback(`${response.status} error`);
        }
    } catch (error) {
        callback('Could not connect to the weather service!');
    }
};

module.exports = forecast;