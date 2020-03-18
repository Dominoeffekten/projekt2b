"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
 const getContinents = function (ev) { //Continents
     let req = Object.create(Ajax);
     req.init();
     req.getFile(`/continents`, showContinents);
 };

 const getCountries = function (ev) { //country
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/countries`, showCountries);
};
const getGoverment = function (ev) { //goverment
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/gover`, showGoverment);
};

 const showContinents = function (e) {
     //here you put the ajax response onto your page DOM
     console.log(e.target.getResponseHeader("Content-Type"));
     let element = $("countryForm");
     while (element.firstChild) {
         element.removeChild(element.firstChild);
     }
     //lav en formular
     let formular = $("countryForm");
     let forms = document.createElement("form");
     forms.setAttribute("id", "goverment");
     forms.setAttribute("method", "POST");
     forms.setAttribute("action", "/country");

     let input2 = document.createElement("input");
     input2.setAttribute("name", "name");
     input2.setAttribute("id", "name");
     input2.setAttribute("type", "text");
     input2.setAttribute("placeholder", "Name");
     forms.appendChild(input2);

     let input1 = document.createElement("input");
     input1.setAttribute("name", "code");
     input1.setAttribute("id", "code");
     input1.setAttribute("type", "text");
     input1.setAttribute("placeholder", "Three cifre code");
     forms.appendChild(input1);


     let continents = JSON.parse(e.target.responseText); //Show continent
     let sel = document.createElement('select');
     sel.setAttribute('id', 'chooseContinent');
     sel.setAttribute("name", "Continent");

     continents.forEach(function(continent) {
         let opt = document.createElement('option');
         let opttext = document.createTextNode(continent.name);
         opt.setAttribute("value", continent.name);

         opt.appendChild(opttext);
         sel.appendChild(opt);
     });
     forms.appendChild(sel);



     let input4 = document.createElement("input");
     input4.setAttribute("name", "region");
     input4.setAttribute("type", "text");
     input4.setAttribute("id", "region");
     input4.setAttribute("placeholder", "Region");
     forms.appendChild(input4);

     let input5 = document.createElement("input");
     input5.setAttribute("name", "surfacearea");
     input5.setAttribute("type", "number");
     input5.setAttribute("id", "surfacearea");
     input5.setAttribute("placeholder", "Surfacearea");
     forms.appendChild(input5);

     let input6 = document.createElement("input");
     input6.setAttribute("name", "indepyear");
     input6.setAttribute("id", "indepyear");
     input6.setAttribute("type", "number");
     input6.setAttribute("placeholder", "Indepyear");
     forms.appendChild(input6);

     let input7 = document.createElement("input");
     input7.setAttribute("name", "population");
     input7.setAttribute("id", "population");
     input7.setAttribute("type", "number");
     input7.setAttribute("placeholder", "Population");
     forms.appendChild(input7);

     let input8 = document.createElement("input");
     input8.setAttribute("name", "lifeexpectancy");
     input8.setAttribute("id", "lifeexpectancy");
     input8.setAttribute("type", "number");
     input8.setAttribute("placeholder", "Lifeexpectancy");
     forms.appendChild(input8);

     let input9 = document.createElement("input");
     input9.setAttribute("name", "gnp");
     input9.setAttribute("id", "gnp");
     input9.setAttribute("type", "number");
     input9.setAttribute("placeholder", "GNP");
     forms.appendChild(input9);

     let input10 = document.createElement("input");
     input10.setAttribute("name", "gnpold");
     input10.setAttribute("id", "gnpold");
     input10.setAttribute("type", "number");
     input10.setAttribute("placeholder", "Old GNP");
     forms.appendChild(input10);

     let input11 = document.createElement("input");
     input11.setAttribute("name", "localname");
     input11.setAttribute("id", "localname");
     input11.setAttribute("type", "text");
     input11.setAttribute("placeholder", "Localname");
     forms.appendChild(input11);

     let input12 = document.createElement("select");
     input12.setAttribute("id", "governmentform");
     input12.setAttribute("type", "text");
     input12.setAttribute("name", "governmentform");
     input12.setAttribute("placeholder", "Government form");
     forms.appendChild(input12);

     let input13 = document.createElement("input");
     input13.setAttribute("name", "headofstate");
     input13.setAttribute("id", "headofstate");
     input13.setAttribute("type", "text");
     input13.setAttribute("placeholder", "Head of state");
     forms.appendChild(input13);

     let input14 = document.createElement("input");
     input14.setAttribute("name", "capital");
     input14.setAttribute("id", "capital");
     input14.setAttribute("type", "text");
     input14.setAttribute("placeholder", "Capital");
     forms.appendChild(input14);

     let input15 = document.createElement("input");
     input15.setAttribute("name", "code2");
     input15.setAttribute("id", "code2");
     input15.setAttribute("type", "text");
     input15.setAttribute("placeholder", "Two cifre code");
     forms.appendChild(input15);

     formular.appendChild(forms);

     getGoverment()
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
        
        //update
        let td4 = document.createElement('td');
        let form1 = document.createElement('form');
        form1.setAttribute("method", "POST");
        form1.setAttribute("action", "/countryRead");
        form1.addEventListener('click', readCountry);

        let input1 = document.createElement('input');
        input1.setAttribute("value", country.name);
        input1.setAttribute("name", "name");
        input1.setAttribute("type", "hidden");

        let upButton = document.createElement('button');
        upButton.setAttribute("class", "upButton");
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
        delButton.setAttribute("class", "delButton");
        let delI = document.createElement("I");
        delI.setAttribute("class", "fas fa-times");
        delButton.appendChild(delI);

        //td5.setAttribute("class", "removeButton");

        td.appendChild(name);
        td1.appendChild(code);
        td2.appendChild(continent);
        td3.appendChild(pop);
        form1.appendChild(input1);
        form1.appendChild(upButton);
        td4.appendChild(form1);
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


    div.appendChild(tabel);
    $("countdata").appendChild(div);
    });
};



const showGoverment = function (e) {
    //here you put the ajax response onto your page DOM
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("countryForm");
    //while (element.firstChild) {
    //    element.removeChild(element.firstChild);
    //}
    let gover = JSON.parse(e.target.responseText); //Show continent
    let sel = $('governmentform');
    sel.setAttribute("name", "governmentform");

    gover.forEach(function(gover) {
        let opt = document.createElement('option');
        let opttext = document.createTextNode(gover.name);
        opt.setAttribute("value", gover.name);
        opt.appendChild(opttext);
        sel.appendChild(opt);

    });
    $("goverment").appendChild(sel);
    let submitButton = document.createElement("button");
    let buttonName = document.createTextNode("Add new country");
    submitButton.setAttribute("id", "submitButton");
    submitButton.appendChild(buttonName);
    $("goverment").appendChild(submitButton);
};

 const readCountry = function (ev) { //Continents
     let req = Object.create(Ajax);
     req.init();
     req.getFile(`/countryRead`, showCountry);
 };

 const showCountry = function (e) {
    console.log(e.target.getResponseHeader("Content-Type"));
    let country = JSON.parse(e.target.responseText);
    console.log(country);
 }



let initialize = function () {
  getCountries();
  getContinents();
}

window.addEventListener("load", initialize);
