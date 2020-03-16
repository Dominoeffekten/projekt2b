"use strict";
const mon = require("./mongooseWrap");
const Continent = require("./Continent");

exports.getContinents = async function (que, sort) {
    try {
        let cs = await mon.retrieve("localhost", "world", Continent, que, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
}