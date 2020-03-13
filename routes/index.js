const express = require('express');
const router = express.Router();
const modContinent = require("../models/handleContinents");
const modCountry = require("../models/handleCountries");
const modCities = require("../models/handleCities"); 

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Fragments of the World',
        subtitle: 'Playing with the World'
    });
});

router.get('/worldview', async function(req, res, next) {
    res.render('worldview', {
        title: 'Fragments of the World',
        subtitle: 'Start by Choosing a Continent'
    });
});

router.get('/continents', async function(req, res, next) {
    let continents = await modContinent.getContinents({}, {sort: {name: 1}});
    res.json(continents);
});

router.get('/countries/:cont', async function(req, res, next) {
    let countries = await modCountry.getCountries({continent: req.params.cont}, {sort: {name: 1}});
    //console.log(countries);
    res.json(countries);
    
});
router.get('/cities/:city', async function(req, res, next) {
    //console.log(req.params.city)
    let city = await modCities.getCities({countrycode: req.params.city}, {sort: {name: 1}});
    res.json(city);
});

router.get('/weather', async function(req, res, next) {

});


module.exports = router;
