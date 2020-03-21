"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
const getContinents = function (ev) {
    makeForm();
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/continents", showContinents);
};
const getCountries = function (ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/countries/${ev.target.value}`, showCountries);
};
const getCities = function (ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/cities/${ev.target.value}`, showCities);
};
/*
 * callback function for the above AJaX
 */
const showContinents = function (e) {

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

    continents.forEach(function (continent) {
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
    let countries = JSON.parse(e.target.responseText);
    let selector = $("countrycode");
    countries.forEach(function(country) {
        let opt = document.createElement('option');
        let opttext = document.createTextNode(country.code);
        opt.setAttribute("value", country.code);
        opt.setAttribute("id", country.code);
        opt.appendChild(opttext);
        selector.appendChild(opt);
    });

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

    
    let sel = document.createElement('select');
    sel.setAttribute('id', 'chooseCountry');
    sel.addEventListener('change', getCities);
    countries.forEach(function (country) {
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
    let option = $(cities[0].countrycode);
    option.setAttribute("selected", "selected");

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

    cities.forEach(function (city) {

        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let name = document.createTextNode(city.name);
        let td1 = document.createElement('td');
        let code = document.createTextNode(city.countrycode);
        let td3 = document.createElement('td');
        let pop = document.createTextNode(city.population);
        
        let td4 = document.createElement('td');
        let form1 = document.createElement('form');
        form1.setAttribute("method", "POST");
        form1.setAttribute("action", "/cityRead");
        let input1 = document.createElement('input');
        input1.setAttribute("value", city.oldid);
        input1.setAttribute("name", "oldid");
        input1.setAttribute("type", "hidden");
        let upButton = document.createElement('button');
        upButton.setAttribute("class", "upButton");
        let delU = document.createElement("I");
        delU.setAttribute("class", "far fa-edit");
        upButton.appendChild(delU);
        form1.appendChild(input1);
        form1.appendChild(upButton);
        td4.appendChild(form1);

        //delete button
        let td5 = document.createElement('td');
        let form = document.createElement('form');
        form.setAttribute("method", "POST");
        form.setAttribute("action", "/city");
        let input = document.createElement('input');
        input.setAttribute("value", city.oldid);
        input.setAttribute("name", "name");
        input.setAttribute("type", "hidden");
        let delButton = document.createElement('button');
        delButton.setAttribute("class", "delButton");
        let delI = document.createElement("I");
        delI.setAttribute("class", "fas fa-times");
        delButton.appendChild(delI);
        delButton.appendChild(delI);
        form.appendChild(input);
        form.appendChild(delButton);
        td5.appendChild(form);
        // delete button end

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

const makeForm = function(e){
    //here you put the ajax response onto your page DOM
     
    // lav en formular

    let formularCity = $("cityForm")
    let ctyForms = document.createElement("form");
    ctyForms.setAttribute("id", "city");
    ctyForms.setAttribute("method", "POST");
    ctyForms.setAttribute("action", "/cities");

    let cyinput2 = document.createElement("input");
    cyinput2.setAttribute("name", "name");
    cyinput2.setAttribute("id", "name");
    cyinput2.setAttribute("type", "text");
    cyinput2.setAttribute("placeholder", "Name");
    ctyForms.appendChild(cyinput2);

    let cyinput1 = document.createElement("select");
    cyinput1.setAttribute("name", "countrycode");
    cyinput1.setAttribute("id", "countrycode");
    ctyForms.appendChild(cyinput1);

    let cyinput3 = document.createElement("input");
    cyinput3.setAttribute("name", "district");
    cyinput3.setAttribute("id", "district");
    cyinput3.setAttribute("type", "text");
    cyinput3.setAttribute("placeholder", "district");
    ctyForms.appendChild(cyinput3);

    let cyinput4 = document.createElement("input");
    cyinput4.setAttribute("name", "population");
    cyinput4.setAttribute("id", "population");
    cyinput4.setAttribute("type", "text");
    cyinput4.setAttribute("placeholder", "population");
    ctyForms.appendChild(cyinput4);

    let submitButton = document.createElement("button");
    let buttonName = document.createTextNode("Add new city");
    submitButton.setAttribute("id", "submitButton");
    submitButton.appendChild(buttonName);
    ctyForms.appendChild(submitButton);

    formularCity.appendChild(ctyForms);
    // formular end
}

window.addEventListener("load", getContinents);                   // kick off JS
