"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
const getCountries = function (ev) { //country
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

        let upButton = document.createElement('button');
        let delU = document.createElement("I");
        delU.setAttribute("class", "far fa-edit");
        upButton.appendChild(delU);

        let td5 = document.createElement('td');
        let form = document.createElement('form');
        form.setAttribute("method", "POST");
        form.setAttribute("action", "/countries");

        let input = document.createElement('input');
        input.setAttribute("value", country.name);
        input.setAttribute("name", "id");
        input.setAttribute("type", "hidden");

        let delButton = document.createElement('button');
        let delI = document.createElement("I");
        delI.setAttribute("class", "fas fa-times");
        delButton.appendChild(delI); 
        
        //td5.setAttribute("class", "removeButton");

        td.appendChild(name);
        td1.appendChild(code);
        td2.appendChild(continent);
        td3.appendChild(pop);
        td4.appendChild(upButton);
        delButton.appendChild(delI);
        form.appendChild(input);
        form.appendChild(delButton);
        td5.appendChild(form);
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

    let formular = $("countryForm");
    let form = document.createElement("form");

    let input1 = document.createElement("input");
    input1.setAttribute("name", "code");
    form.appendChild(input1);
    let input2 = document.createElement("input");
    input2.setAttribute("name", "name");
    form.appendChild(input2);
    let input3 = document.createElement("input");
    input3.setAttribute("name", "continent");
    form.appendChild(input3);
    let input4 = document.createElement("input");
    input4.setAttribute("name", "region");
    form.appendChild(input4);
    let input5 = document.createElement("input");
    input5.setAttribute("name", "surfacearea");
    form.appendChild(input5);
    let input6 = document.createElement("input");
    input6.setAttribute("name", "indepyear");
    form.appendChild(input6);
    let input7 = document.createElement("input");
    input7.setAttribute("name", "population");
    form.appendChild(input7);
    let input8 = document.createElement("input");
    input8.setAttribute("name", "lifeexpectancy");
    form.appendChild(input8);
    let input9 = document.createElement("input");
    input9.setAttribute("name", "gnp");
    form.appendChild(input9);
    let input10 = document.createElement("input");
    input10.setAttribute("name", "gnpold");
    form.appendChild(input10);
    let input11 = document.createElement("input");
    input11.setAttribute("name", "localname");
    form.appendChild(input11);
    let input12 = document.createElement("input");
    input12.setAttribute("name", "governmentform");
    form.appendChild(input12);
    let input13 = document.createElement("input");
    input13.setAttribute("name", "headofstate");
    form.appendChild(input13);
    let input14 = document.createElement("input");
    input14.setAttribute("name", "capital");
    form.appendChild(input14);
    let input15 = document.createElement("input");
    input15.setAttribute("name", "code2");
    form.appendChild(input15);
    let submitButton = document.createElement("button");
    let buttonName = document.createTextNode("Add new country");
    submitButton.appendChild(buttonName);
    form.appendChild(submitButton);

    formular.appendChild(form);






};
window.addEventListener("load", getCountries);