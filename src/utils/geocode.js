const got = require('got');

const geocode = async (address, callback) => {
    const accessToken = 'pk.eyJ1IjoicnVtZG9vZGxlIiwiYSI6ImNrZ3A5dXUycjFkNzQyc282cDZmOXR3NjkifQ.O7Rns75xeSRfFP9HxdG6KQ';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${accessToken}&limit=1`;

    try {
        const response = await got(url);
        if (response.statusCode === 200) {
            const data = JSON.parse(response.body);
            callback(undefined, {
                location: data.features[0].place_name,
                latitude: data.features[0].center[1].toString(),
                longitude: data.features[0].center[0].toString()
            });
        } else {
            callback(`${response.status} error`);
        }
    } catch (error) {
        callback('Could not connect to the geocoding service!');
    }
};

module.exports = geocode;