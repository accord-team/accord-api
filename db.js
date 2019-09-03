"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knexfile = require("../knexfile.js");
var Knex = require("knex");
exports.IKnex = Knex;
var ENVIROMENT = process.env.ENV || "development";
var knex = Knex(knexfile[ENVIROMENT]);
exports.knex = knex;
//# sourceMappingURL=db.js.map