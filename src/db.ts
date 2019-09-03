import * as knexfile from '../knexfile.js';
import * as Knex from 'knex';

const ENVIROMENT = process.env.ENV || "development";

const knex = Knex(knexfile[ENVIROMENT]);

export { knex, Knex as IKnex };
