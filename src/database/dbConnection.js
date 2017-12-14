const pgp = require('pg-promise')();
const env = require('env2')('./config.env');
const url = require('url');

const params = url.parse(process.env.HEROKU_DB);
const [username, password] = params.auth.split(':');

const herokuDB = {
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    max: process.env.DB_MAX_CONNECTIONS || 2,
    ssl: true,
};

if (username) { herokuDB.user = username; }
if (password) { herokuDB.password = password; }

const localDB = {
    host: 'localhost',
    port: 5432,
    database: 'fachorror',
    user: 'master',
    password: 'password'
};

const connection = process.env.NODE_ENV === 'production' ? herokuDB : localDB;
console.log(process.env.NODE_ENV, 'production');

const db = pgp(connection);
module.exports = db;
