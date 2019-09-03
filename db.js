"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knexfile = require("../knexfile.js");
var Knex = require("knex");
exports.IKnex = Knex;
var knex = Knex(knexfile.staging);
exports.knex = knex;
//# sourceMappingURL=db.js.map