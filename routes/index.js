const express = require('express');
const router = express.Router();
const modContinent = require("../models/handleContinents");
const modCountry = require("../models/handleCountries");
const modCities = require("../models/handleCities"); 
const modLang = require("../models/handleLanguages"); 
const modGover = require("../models/handleGovernmentForms"); 


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        subtitle: 'Playing with the World'
    });
});

//continent
router.get('/worldview', async function(req, res, next) {
    res.render('worldview', {
        scriptLink:'/javascripts/continent.js',
        subtitle: 'The continents',
    });
});
router.get('/continents', async function(req, res, next) {
    let continents = await modContinent.getContinents({}, {sort: {name: 1}});
    res.json(continents);
});

//country
router.get('/country', async function(req, res, next) {
    res.render('country', {
        scriptLink:'/javascripts/country.js',
        subtitle: 'The countries',
        
    });
});
router.get('/countries', async function(req, res, next) {
    let countries = await modCountry.getCountries({}, {sort: {continent: 1}});
    //console.log(countries);
    res.json(countries);
});

router.post('/countries', async function(req, res, next) {
    let delCountry = modCountry.delCountries(req.body.id);
    console.log("Yah du kom herind");
});




//city
router.get('/city', async function(req, res, next) {
    res.render('city', {
        scriptLink:'/javascripts/citypage.js',
        subtitle: 'The cities',
    });
});
router.get('/countries/:cont', async function(req, res, next) {
    let countries = await modCountry.getCountries({continent: req.params.cont}, {sort: {name: 1}});
    //console.log(countries);
    res.json(countries);
    
});
router.get('/city/:cont', async function(req, res, next) {
    let countries = await modCountry.getCountries({continent: req.params.cont}, {sort: {name: 1}});
    console.log(req.params.cont);
    //console.log(countries);
    res.json(countries);
});
router.get('/cities/:city', async function(req, res, next) {
    //console.log(req.params.city)
    let city = await modCities.getCities({countrycode: req.params.city}, {sort: {name: 1}});
    res.json(city);
});

router.post('/city', async function(req, res, next) {
    console.log(req.body.id);
    let delCity = modCities.delCities({_id: req.body.id});
    console.log(delCity);
    console.log("Yah du kom herind");
});

//Lang
router.get('/lang', async function(req, res, next) {
    res.render('lang', {
        scriptLink:'/javascripts/lang.js',
        subtitle: 'The language',
    });
});
router.get('/lang/:city', async function(req, res, next) {
    //console.log(req.params.city)
    let lang = await modLang.getLanguages({countrycode: req.params.city}, {sort: {name: 1}});
    res.json(lang);
});

//Lang
router.get('/goverments', async function(req, res, next) {
    res.render('goverments', {
        scriptLink:'/javascripts/gover.js',
        subtitle: 'The form of goverments',
    });
});
router.get('/gover', async function(req, res, next) {
    let goverments = await modGover.getGovernmentForms({}, {sort: {name: 1}});
    //console.log(countries);
    res.json(goverments);
});



module.exports = router;
