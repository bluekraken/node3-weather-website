const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Setup the static directory
app.use(express.static(path.join(__dirname, '../public')));

// Render the home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Hearse'
    });
});

// Render the about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this site...',
        name: 'Andrew Hearse'
    });
});

// Render the about page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Hearse',
        message: 'I need somebody to help me please!'
    });
});

// Render the weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        });
    });
});

// Render the help article not found
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Andrew Hearse',
        message: 'Help article not found!'
    });
});

// Render the page not found
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Andrew Hearse',
        message: 'Page not found!'
    });
});

// Start the server
app.listen(3000, () => {
    console.log(chalk.yellow('Server started on port 3000.'));
});