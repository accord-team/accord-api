"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Knex = require("knex");
exports.IKnex = Knex;
var knexfile = {};
var ENVIROMENT = process.env.ENV || "development";
if (ENVIROMENT === 'development') {
    knexfile = require('../knexfile.js');
}
else {
    knexfile = require('./knexfile.js');
}
var knex = Knex(knexfile[ENVIROMENT]);
exports.knex = knex;
//# sourceMappingURL=db.js.map