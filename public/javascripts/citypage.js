"use strict";
import {$} from "./modules/nQuery.js";
import {Ajax} from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
const getContinents = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/continents", showContinents);
};
const getCountries = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/countries/${ev.target.value}`, showCountries);
};
const getCities = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/cities/${ev.target.value}`, showCities);
};
/*
 * callback function for the above AJaX
 */
const showContinents = function(e) {

    //here you put the ajax response onto your page DOM
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("contdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");

    let h3 = document.createElement('h3');
    let txt = document.createTextNode('Choose a continent');
    h3.appendChild(txt);
    div.appendChild(h3);

    let continents = JSON.parse(e.target.responseText);
    let sel = document.createElement('select');
    sel.setAttribute('id', 'chooseContinent');
    sel.addEventListener('change', getCountries);

    continents.forEach(function(continent) {
        let opt = document.createElement('option');
        let opttext = document.createTextNode(continent.name);
        opt.setAttribute("value", continent.name);
        opt.appendChild(opttext);
        sel.appendChild(opt);
    });
    div.appendChild(sel);
    $("contdata").appendChild(div);
}

const showCountries = function (e) {
    
    //here you put the ajax response onto your page DOM
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("countdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('Choose a country');
    h3.appendChild(txt);
    div.appendChild(h3);

    let countries = JSON.parse(e.target.responseText);
    let sel = document.createElement('select');
    sel.setAttribute('id', 'chooseCountry');
    sel.addEventListener('change', getCities);
    countries.forEach(function(country) {
        let opt = document.createElement('option');
        let opttext = document.createTextNode(country.name);
        opt.setAttribute("value", country.code);
        opt.appendChild(opttext);
        sel.appendChild(opt);
    });
    div.appendChild(sel);
    $("countdata").appendChild(div);
};

const showCities = function (e) {
    
    //here you put the ajax response onto your page DOM
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("citydata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    //Opret forbindelse til api continent indholdet
    let cities = JSON.parse(e.target.responseText);

    let div = document.createElement("div");

    let tabel = document.createElement("table");
    let th1 = document.createElement('th');
        let name1 = document.createTextNode("Name");
    let th2 = document.createElement('th');
        let cc = document.createTextNode("Country code");
    let th4 = document.createElement('th');
        let pop1 = document.createTextNode("Population");
    let th5 = document.createElement('th');
        let up = document.createTextNode("Update");
    let th6 = document.createElement('th');
        let del = document.createTextNode("Delete");
    
    th1.appendChild(name1);
    th2.appendChild(cc);
    th4.appendChild(pop1);
    th5.appendChild(up);
    th6.appendChild(del);
    tabel.appendChild(th1);
    tabel.appendChild(th2);
    tabel.appendChild(th4);
    tabel.appendChild(th5);
    tabel.appendChild(th6);

    cities.forEach(function(city) {
        
        let tr = document.createElement('tr');
        let td = document.createElement('td');
            let name = document.createTextNode(city.name);
        let td1 = document.createElement('td');
            let code = document.createTextNode(city.countrycode);
        let td3 = document.createElement('td');
            let pop = document.createTextNode(city.population);
        let td4 = document.createElement('td');
            
        let td5 = document.createElement('td');
            

        td.appendChild(name);
        td1.appendChild(code);
        td3.appendChild(pop);
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tabel.appendChild(tr);
    });

    div.appendChild(tabel);
    $("citydata").appendChild(div);
};


window.addEventListener("load", getContinents);                   // kick off JS
