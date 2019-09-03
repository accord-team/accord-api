import * as Knex from 'knex';
let knexfile = {};
const ENVIROMENT = process.env.ENV || "development";

if (ENVIROMENT === 'development') {
  knexfile = require('../knexfile.js');
} else {
  knexfile = require('./knexfile.js')
}


const knex = Knex(knexfile[ENVIROMENT]);

export { knex, Knex as IKnex };
