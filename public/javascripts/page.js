"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
var url = window.location.href.substring(22);

const getContinents = function (ev) { //continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/continents", showContinents);
};
const getCountries = function (ev) { //country
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/countries`, showCountries);
};
const getCities = function (ev) { //city
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/cities`, showCities);
};

const getWeather = function (ev) { //weather app
    let req = Object.create(Ajax);
    req.init();
    req.getFile("http://api.openweathermap.org/data/2.5/weather?q=" + `${ev.target.value}` + "&appid=d419428cf334656903ea18531851df12", showWeather);
};

//callback function for the above AJaX
const showContinents = function (e) {
    console.log(url);

    //here you put the ajax response onto your page DOM
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("contdata");

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('The Continents');
    h3.appendChild(txt);
    div.appendChild(h3);

    //Opret forbindelse til api continent indholdet
    let continents = JSON.parse(e.target.responseText);


    let tabel = document.createElement("table");

    continents.forEach(function (continent) {
        let th = document.createElement('th');
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let name = document.createTextNode(continent.name);
        td.appendChild(name);
        tr.appendChild(td);
        tabel.appendChild(tr);
    });
    div.appendChild(tabel);

    $("contdata").appendChild(div);

}

const showCountries = function (e) {
    console.log(url);
    //here you put the ajax response onto your page DOM
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("countdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('The countries');
    h3.appendChild(txt);
    div.appendChild(h3);

    //Opret forbindelse til api continent indholdet
    let countries = JSON.parse(e.target.responseText);

    let tabel = document.createElement("table");
    let th1 = document.createElement('th');
    let name1 = document.createTextNode("Name");
    let th2 = document.createElement('th');
    let cc = document.createTextNode("Country code");
    let th3 = document.createElement('th');
    let ccon = document.createTextNode("Continent");
    let th4 = document.createElement('th');
    let pop1 = document.createTextNode("Population");
    let th5 = document.createElement('th');
    let up = document.createTextNode("Update");
    let th6 = document.createElement('th');
    let del = document.createTextNode("Delete");

    th1.appendChild(name1);
    th2.appendChild(cc);
    th3.appendChild(ccon);
    th4.appendChild(pop1);
    th5.appendChild(up);
    th6.appendChild(del);
    tabel.appendChild(th1);
    tabel.appendChild(th2);
    tabel.appendChild(th3);
    tabel.appendChild(th4);
    tabel.appendChild(th5);
    tabel.appendChild(th6);

    countries.forEach(function (country) {

        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let name = document.createTextNode(country.name);
        let td1 = document.createElement('td');
        let code = document.createTextNode(country.code);
        let td2 = document.createElement('td');
        let continent = document.createTextNode(country.continent);
        let td3 = document.createElement('td');
        let pop = document.createTextNode(country.population);
        let td4 = document.createElement('td');

        let td5 = document.createElement('td');


        td.appendChild(name);
        td1.appendChild(code);
        td2.appendChild(continent);
        td3.appendChild(pop);
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tabel.appendChild(tr);
    });

    div.appendChild(tabel);
    $("countdata").appendChild(div);
};

const showCities = function (e) {

    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("contdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('The Continents');
    h3.appendChild(txt);
    div.appendChild(h3);
    let continents = JSON.parse(e.target.responseText);
    let sel = document.createElement('select');
    sel.setAttribute('id', 'chooseContinent');
    sel.addEventListener('change', getContinents);
    continents.forEach(function (continent) {
        let opt = document.createElement('option');
        let opttext = document.createTextNode(continent.name);
        opt.appendChild(opttext);
        sel.appendChild(opt);
    });
    div.appendChild(sel);
    $("contdata").appendChild(div);
};
/*
const showWeather = function (e) {

     //here you put the ajax response onto your page DOM
    
    console.log(e.target.getResponseHeader("Content-Type"));
    let obj = JSON.parse(e.target.responseText); 
    let element = $("weatherdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let p = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let p4 = document.createElement("p");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('The weather');
    h3.appendChild(txt);
    div.appendChild(h3);

    let name = document.createTextNode(`${obj.name}, ${obj.sys.country}`);
        for (let i = 0; i < obj.weather.length; i++) { 
            var des = document.createTextNode(`Weather: ${obj.weather[i].description}`);
        };

    var temp = document.createTextNode(`Temp: ${obj.main.temp}`);
    var feels = document.createTextNode(`Feels like: ${obj.main.feels_like}`);

    p.appendChild(name);
    p2.appendChild(des);
    p3.appendChild(temp);
    p4.appendChild(feels);
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);

    $("weather").appendChild(div);
};

const showStarter = function () {
    $('gcont').addEventListener('click', getContinents);
};
*/

if (url == "worldview") {
    window.addEventListener("load", getContinents);
} else if (url == "country") {
    window.addEventListener("load", getCountries);
} else if (url == "city") {
    window.addEventListener("load", getCities);
}
