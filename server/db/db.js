const mysql = require('mysql');
const config = require('../../util/config');

const db = mysql.createConnection(config);


module.exports = db;

