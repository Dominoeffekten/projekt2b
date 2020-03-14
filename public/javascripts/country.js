"use strict";
import {$} from "./modules/nQuery.js";
import {Ajax} from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
const getCountries = function(ev) { //country
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/countries`, showCountries);
};

const showCountries = function (e) {
    //here you put the ajax response onto your page DOM
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("countdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    //Opret forbindelse til api continent indholdet
    let countries = JSON.parse(e.target.responseText);

    let div = document.createElement("div");
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

    countries.forEach(function(country) {
        
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
            let upButton = document.createElement('button');
            var upText = document.createTextNode("Update"); 
        let td5 = document.createElement('td');
            let delButton = document.createElement('button');
            var delText = document.createTextNode("Delete"); 
            delButton.setAttribute("id", country._id);
            //td5.setAttribute("class", "removeButton");
            
    
        td.appendChild(name);
        td1.appendChild(code);
        td2.appendChild(continent);
        td3.appendChild(pop);
        upButton.appendChild(upText);
        td4.appendChild(upButton);
        delButton.appendChild(delText);
        td5.appendChild(delButton);
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

    
    $(country._id).addEventListener("click", function() {
        alert("hello");
    });
    
    

};
window.addEventListener("load", getCountries);
