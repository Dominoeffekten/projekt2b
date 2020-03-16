"use strict";
const mon = require("./mongooseWrap");
const GovernmentForm = require("./GovernmentForm");

exports.getGovernmentForms = async function (que, sort) {
    try {
        let gf = await mon.retrieve("localhost", "world", GovernmentForm, que, sort);
        return gf;
    } catch (e) {
        console.log(e);
    }
}

exports.delGover = async function (name) {
    try {
        let cs = await mon.remove("localhost", "world", GovernmentForm, name);
        return cs;
    } catch (e) {
        console.log(e);
    }
}