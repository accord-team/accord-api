import * as knexfile from '../knexfile.js';
import * as Knex from 'knex';

const knex = Knex(knexfile.staging);

export { knex, Knex as IKnex };
