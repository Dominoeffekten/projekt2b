"use strict";
import {$} from "./modules/nQuery.js";
import {Ajax} from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
const getContinents = function(ev) { //continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/continents", showContinents);
};


//callback function for the above AJaX
const showContinents = function(e) {

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

    continents.forEach(function(continent) {
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

window.addEventListener("load", getContinents);

