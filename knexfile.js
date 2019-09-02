module.exports = {
  development: {
    client: 'mysql',
    connection: {
      port: 3306,
      host: 'localhost',
      database: 'test',
      user: 'root',
      password: '',
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  staging: {
    client: 'mysql',
    connection: {
      port: 3306,
      host: 'remotemysql.com',
      database: '8NwrzaKjH1',
      user: '8NwrzaKjH1',
      password: 'cohvaJgiGY',
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  }
}