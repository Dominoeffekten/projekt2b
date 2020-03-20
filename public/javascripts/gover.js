"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
const getGoverment = function (ev) { //country
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/gover`, showGoverment);
};

const showGoverment = function (e) {
    //here you put the ajax response onto your page DOM
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("goverdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    //Opret forbindelse til api continent indholdet
    let goverments = JSON.parse(e.target.responseText);

    let div = document.createElement("div");
    let tabel = document.createElement("table");

    let th1 = document.createElement('th');
        let name = document.createTextNode("Name");
    let th2 = document.createElement('th');
        let del = document.createTextNode("Delete");

    th1.appendChild(name);
    th2.appendChild(del);
    tabel.appendChild(th1);
    tabel.appendChild(th2);

    goverments.forEach(function (goverment) {

        let tr = document.createElement('tr');
        
        let td = document.createElement('td');
            let name = document.createTextNode(goverment.name);
        
        let td2 = document.createElement('td');
            let form = document.createElement('form');
            form.setAttribute("method", "POST");
            form.setAttribute("action", "/goverments");

        let input = document.createElement('input');
        input.setAttribute("value", goverment.name);
        input.setAttribute("name", "name");
        input.setAttribute("type", "hidden");

        let delButton = document.createElement('button');
        delButton.setAttribute("class", "delButton");
        let delI = document.createElement("I");
        delI.setAttribute("class", "fas fa-times");
        delButton.appendChild(delI);

        td.appendChild(name);
        tr.appendChild(td);

        delButton.appendChild(delI);
        form.appendChild(delButton);
        form.appendChild(input);
        td2.appendChild(form);
        tr.appendChild(td2);
        tabel.appendChild(tr);
        


    });
    div.appendChild(tabel);
    makeForm();
    $("goverdata").appendChild(div);
};

const makeForm = function(e){
    //here you put the ajax response onto your page DOM
     
    // lav en formular

    let formularGover = $("goverForm")
    let goverForms = document.createElement("form");
    goverForms.setAttribute("id", "gover");
    goverForms.setAttribute("method", "POST");
    goverForms.setAttribute("action", "/gover");

    let goverinput2 = document.createElement("input");
    goverinput2.setAttribute("name", "name");
    goverinput2.setAttribute("id", "name");
    goverinput2.setAttribute("type", "text");
    goverinput2.setAttribute("placeholder", "Name");
    goverForms.appendChild(goverinput2);

    let submitButton = document.createElement("button");
    let buttonName = document.createTextNode("Add a government form");
    submitButton.setAttribute("id", "submitButton");
    submitButton.appendChild(buttonName);
    goverForms.appendChild(submitButton);

    formularGover.appendChild(goverForms);
    // formular end
}

window.addEventListener("load", getGoverment);
