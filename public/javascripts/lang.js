"use strict";
import {$} from "./modules/nQuery.js";
import {Ajax} from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
const getContinents = function(ev) {
    makeForm();
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/continents", showContinents);
};
const getCountries = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/countries/${ev.target.value}`, showCountries);
};
const getLang = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/lang/${ev.target.value}`, showLang);
};

const readLang = function (ev) { //Continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/langRead`, showReadLang);
};

const showReadLang = function (e) {
    console.log(e.target.getResponseHeader("Content-Type"));
    let country = JSON.parse(e.target.responseText);
    console.log(country);
 }
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
    sel.addEventListener('change', getLang);
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

const showLang = function (e) {
    
    //here you put the ajax response onto your page DOM
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("langdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    //Opret forbindelse til api continent indholdet
    let langs = JSON.parse(e.target.responseText);
    console.log(langs);

    let option = $(langs[0].countrycode);
    option.setAttribute("selected", "selected");

    let div = document.createElement("div");

    let tabel = document.createElement("table");
    let th1 = document.createElement('th');
        let name1 = document.createTextNode("Name");
    let th2 = document.createElement('th');
        let cc = document.createTextNode("Country code");
    let th4 = document.createElement('th');
        let pop1 = document.createTextNode("Is official");
    let th5 = document.createElement('th');
        let speak = document.createTextNode("Percentage");
    let th6 = document.createElement('th');
        let up = document.createTextNode("Update");
    let th7 = document.createElement('th');
        let del = document.createTextNode("Delete");
    
    th1.appendChild(name1);
    th2.appendChild(cc);
    th4.appendChild(pop1);
    th5.appendChild(speak);
    th6.appendChild(up);
    th7.appendChild(del);
    tabel.appendChild(th1);
    tabel.appendChild(th2);
    tabel.appendChild(th4);
    tabel.appendChild(th5);
    tabel.appendChild(th6);
    tabel.appendChild(th7);

    langs.forEach(function(lang) {
        
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let name = document.createTextNode(lang.language);
        td.appendChild(name);
        tr.appendChild(td);

        let td1 = document.createElement('td');
        let code = document.createTextNode(lang.countrycode);
        td1.appendChild(code);
        tr.appendChild(td1);

        let td3 = document.createElement('td');
        let pop = document.createTextNode(lang.isofficial);
        td3.setAttribute("id", "official"+lang.percentage);
        td3.appendChild(pop);
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        let speak = document.createTextNode(lang.percentage);
        td4.appendChild(speak);
        tr.appendChild(td4);

        //update



        let td5 = document.createElement('td');
        let upForm = document.createElement('form');
        upForm.setAttribute("method", "POST");
        upForm.setAttribute("action", "/langRead");
        upForm.addEventListener('click', readLang);

        let inputUp = document.createElement('input');
        inputUp.setAttribute("value", lang.countrycode);
        inputUp.setAttribute("name", "countrycode");
        inputUp.setAttribute("type", "hidden");
        upForm.appendChild(inputUp);

        let inputUp2 = document.createElement('input');
        inputUp2.setAttribute("value", lang.language);
        inputUp2.setAttribute("name", "language");
        inputUp2.setAttribute("type", "hidden");
        upForm.appendChild(inputUp2);

        let upButton = document.createElement('button');
        upButton.setAttribute("class", "upButton");
        let delU = document.createElement("I");
        delU.setAttribute("class", "far fa-edit");
        upButton.appendChild(delU);
        upForm.appendChild(upButton);
        td5.appendChild(upForm);
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        let form = document.createElement('form');
        form.setAttribute("method", "POST");
        form.setAttribute("action", "/lang");
        td6.appendChild(form);
        tr.appendChild(td6);

        let input = document.createElement('input');
        input.setAttribute("value", lang.countrycode);
        input.setAttribute("name", "cc");
        input.setAttribute("type", "hidden");
        form.appendChild(input);

        let input1 = document.createElement('input');
        input1.setAttribute("value", lang.language);
        input1.setAttribute("name", "lang");
        input1.setAttribute("type", "hidden");
        form.appendChild(input1);
        
        let delButton = document.createElement('button');
        delButton.setAttribute("class", "delButton")
        let delI = document.createElement("I");
        delI.setAttribute("class", "fas fa-times");
        delButton.appendChild(delI);
        form.appendChild(delButton);
        
        tabel.appendChild(tr);
    });

    div.appendChild(tabel);
    $("langdata").appendChild(div);
};

const makeForm = function(e){ 
    // lav en formular

    let formularCity = $("langForm")
    let ctyForms = document.createElement("form");
    ctyForms.setAttribute("id", "lang");
    ctyForms.setAttribute("method", "POST");
    ctyForms.setAttribute("action", "/language");

    let sel = document.createElement('select');
    sel.setAttribute('id', 'countrycode');
    sel.setAttribute("name", "countrycode");

    ctyForms.appendChild(sel);
    let cyinput3 = document.createElement("input");
    cyinput3.setAttribute("name", "language");
    cyinput3.setAttribute("id", "language");
    cyinput3.setAttribute("type", "text");
    cyinput3.setAttribute("placeholder", "Language");
    ctyForms.appendChild(cyinput3);

    let cyinput4 = document.createElement("input");
    cyinput4.setAttribute("name", "isofficial");
    cyinput4.setAttribute("id", "isofficial");
    cyinput4.setAttribute("type", "text");
    cyinput4.setAttribute("placeholder", "Is official");
    ctyForms.appendChild(cyinput4);

    let cyinput5 = document.createElement("input");
    cyinput5.setAttribute("name", "percentage");
    cyinput5.setAttribute("id", "percentage");
    cyinput5.setAttribute("type", "number");
    cyinput5.setAttribute("placeholder", "Percentage");
    ctyForms.appendChild(cyinput5);

    let submitButton = document.createElement("button");
    let buttonName = document.createTextNode("Add new language");
    submitButton.setAttribute("id", "submitButton");
    submitButton.appendChild(buttonName);
    ctyForms.appendChild(submitButton);

    formularCity.appendChild(ctyForms);
    // formular end
}


window.addEventListener("load", getContinents);                   // kick off JS
