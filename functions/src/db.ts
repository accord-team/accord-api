import * as Knex from 'knex';
import * as admin from 'firebase-admin';
import { FireSQL } from 'firesql';
const firebaseCert = require('../../firebaseCert.json');

const db = admin.initializeApp({
  credential: admin.credential.cert(firebaseCert),
  databaseURL: 'https://goodiejar-f42ef.firebaseio.com'
});

const firebase = new FireSQL(db.firestore());

const knex = Knex({ client: 'mysql' });

export {
  knex,
  firebase,
};
