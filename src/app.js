const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocoding = require('./utils/geocode');
const forecasting = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ali Raza'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ali Raza'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!',
        });
    }
    geocoding(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
        forecasting(latitude, longitude, (error, { weatherDescription, temperature, feelslike, area}) => {
            if(error){
                return res.send({ error });
            }

            res.send({
                forecast: 'Today weather is '+ weatherDescription +'. It is currently '+ temperature +' degree out. It feels like '+ feelslike +' degree out.',
                area: area,
                location,
                // address: req.query.address,
            });
        });

    });
});

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ali Raza',
        errorMessage: 'Help article not found!'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ali Raza',
        errorMessage: 'Page not found!'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000. Follow the link http://localhost:3000');
});