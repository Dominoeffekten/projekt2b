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

//continent start
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
//continent slut

//country start
router.get('/country', async function(req, res, next) {// load country site
    res.render('country', {
        scriptLink:'/javascripts/country.js',
        subtitle: 'The countries',
    });
});
router.post('/country', async function(req, res, next) {// add new country
    let postCountry = modCountry.postCountry(req);
    res.render('country', {
        scriptLink:'/javascripts/country.js',
        subtitle: 'The countries',
    });
});
router.get('/countries', async function(req, res, next) { // loads the db content for the country site
    let countries = await modCountry.getCountries({}, {sort: {continent: 1}});
    //console.log(countries);
    res.json(countries);
});
router.post('/countries', async function(req, res, next) { // deletes country from db
    let delCountry = modCountry.delCountries({name: req.body.id});
    console.log("Yah du kom herind");
    res.render('country', {
        scriptLink:'/javascripts/country.js',
        subtitle: 'The countries',
    });
});
router.post('/countryRead', async function(req, res, next) {
    let result = await modCountry.getCountries({name: req.body.name}, {sort: {continent: 1}});
    let continent = await modContinent.getContinents({}, {sort: {continent: 1}});
    let governmentform = await modGover.getGovernmentForms({}, {sort: {continent: 1}});
    console.log(result);
    res.render('countryData', {
        title: "You are about to edit selected country: " + req.body.name,
        country: result,
        cont: continent,
        gov: governmentform
    });
});
// countries slut

//city start
router.get('/city', async function(req, res, next) { // load the site
    res.render('city', {
        scriptLink:'/javascripts/citypage.js',
        subtitle: 'The cities',
    });
});
router.post('/cities', async function(req, res, next) {// add new country
    let postLang = modCities.postCity(req);
    res.render('city', {
        scriptLink:'/javascripts/citypage.js',
        subtitle: 'The cities',
    });
});
router.post('/cityRead', async function(req, res, next) {
    console.log(req.body);
    let result = await modCities.getCities({oldid: req.body.oldid}, {sort: {continent: 1}});
    let countries = await modCountry.getCountries({}, {sort: {name: 1}});
    console.log(result);
    res.render('cityData', {
        title: "You are about to edit selected city: " + req.body.name,
        city: result,
        count: countries,
    });
});
router.get('/countries/:cont', async function(req, res, next) { // loads the db content 
    let countries = await modCountry.getCountries({continent: req.params.cont}, {sort: {name: 1}});
    //console.log(countries);
    res.json(countries);
});
router.get('/city/:cont', async function(req, res, next) { // loads the db content 
    let countries = await modCountry.getCountries({continent: req.params.cont}, {sort: {name: 1}});
    console.log(req.params.cont);
    //console.log(countries);
    res.json(countries);
});
router.get('/cities/:city', async function(req, res, next) { // loads the db content 
    //console.log(req.params.city)
    let city = await modCities.getCities({countrycode: req.params.city}, {sort: {name: 1}});
    res.json(city);
});
router.post('/city', async function(req, res, next) { // deletes country from db
    console.log(req.body.name);
    let delCity = modCities.delCities({oldid: req.body.name});
    console.log("Yah du kom herind");
    res.render('city', {
        scriptLink:'/javascripts/citypage.js',
        subtitle: 'The cities'
    });
});
// cities slut

//Lang start
router.get('/lang', async function(req, res, next) { // load the site
    res.render('lang', {
        scriptLink:'/javascripts/lang.js',
        subtitle: 'The language',
    });
});
router.post('/language', async function(req, res, next) {// add new country
    let postLang = modLang.postLanguages(req);
    res.render('lang', {
        scriptLink:'/javascripts/lang.js',
        subtitle: 'The Languages',
    });
});
router.get('/lang/:city', async function(req, res, next) { // loads the db content 
    //console.log(req.params.city)
    let lang = await modLang.getLanguages({countrycode: req.params.city}, {sort: {name: 1}});
    res.json(lang);
});
router.post('/lang', async function(req, res, next) {  // deletes country from db
    let delLang = modLang.delLanguage({countrycode: req.body.cc, language: req.body.lang});
    console.log("Yah du kom herind");
    res.render('lang', {
        scriptLink:'/javascripts/lang.js',
        subtitle: 'The Languages',
        
    });
});
router.post('/langRead', async function(req, res, next) {
    console.log(req.body);
    let result = await modLang.getLanguages({countrycode: req.body.countrycode, language: req.body.language}, {sort: {continent: 1}});
    let countries = await modCountry.getCountries({}, {sort: {name: 1}});

    console.log(result);
    res.render('langData', {
        title: "You are about to edit selected language: " + req.body.language,
        lang: result,
        count: countries,
    });
});
// languages slut

// government start
router.get('/goverments', async function(req, res, next) { // load the site
    res.render('goverments', {
        scriptLink:'/javascripts/gover.js',
        subtitle: 'The form of goverments'
    });
});
router.post('/gover', async function(req, res, next) {// add new country
    let postGover = modGover.postGover(req);
    res.render('goverments', {
        scriptLink:'/javascripts/gover.js',
        subtitle: 'The form of governments',
    });
});
router.get('/gover', async function(req, res, next) {  // loads the db content 
    //console.log(req.params.city)
    let gover = await modGover.getGovernmentForms({}, {sort: {name: 1}});
    res.json(gover);
});
router.post('/goverments', async function(req, res, next) { // deletes country from db
    let delGover = modGover.delGover({name: req.body.name});
    console.log("Yah du kom herind");
    res.render('goverments', {
        scriptLink:'/javascripts/gover.js',
        subtitle: 'The form of goverments'
    });
});
// government slut



module.exports = router;
