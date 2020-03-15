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
    let th5 = document.createElement('th');
        let up = document.createTextNode("Update");
    let th6 = document.createElement('th');
        let del = document.createTextNode("Delete");

    th1.appendChild(name);
    th5.appendChild(up);
    th6.appendChild(del);
    tabel.appendChild(th1);
    tabel.appendChild(th5);
    tabel.appendChild(th6);

    goverments.forEach(function (goverment) {

        let tr = document.createElement('tr');
        
        let td = document.createElement('td');
            let name = document.createTextNode(goverment.name);
        
        let td4 = document.createElement('td');
            let upButton = document.createElement('button');
            var upText = document.createTextNode("Update");
        
        let td5 = document.createElement('td');
            let form = document.createElement('form');
            form.setAttribute("method", "POST");
            form.setAttribute("action", "/goverments");

        let input = document.createElement('input');
        input.setAttribute("value", goverment._id);
        input.setAttribute("name", "id");
        input.setAttribute("type", "hidden");

        let delButton = document.createElement('button');
        var delText = document.createTextNode("Delete");
        delButton.setAttribute("type", "submit");
        
        //td5.setAttribute("class", "removeButton");

        delButton.addEventListener("click", function () {
            //var countryId = this.getAttribute("id");
            //alert("delete country._id: " + countryId);
            console.log("this button works ... YAY"); 
        });

        td.appendChild(name);
        tr.appendChild(td);

        upButton.appendChild(upText);
        td4.appendChild(upButton);
        tr.appendChild(td4);

        delButton.appendChild(delText);
        form.appendChild(delButton);
        form.appendChild(input);
        td5.appendChild(form);
        tr.appendChild(td5);
        
        tabel.appendChild(tr);
        


    });

    div.appendChild(tabel);
    $("goverdata").appendChild(div);






};
window.addEventListener("load", getGoverment);
