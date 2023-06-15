/* const mysql = require('mysql2/promise');



function connect(){

  return mysql.createConnection({

    database: 'depttracker_db',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    namedPlaceholders: true,
  })

}

module.exports = connect; */

const mysql = require('mysql2/promise');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  namedPlaceholders: true,
};

async function connect() {
  try {
    const connection = await mysql.createConnection(config);
    await connection.query('CREATE DATABASE IF NOT EXISTS `depttracker_db`');
    await connection.end();

    const dbConfig = {
      ...config,
      database: 'depttracker_db',
    };

    const dbConnection = await mysql.createConnection(dbConfig);

    return dbConnection;
  } catch (error) {
    console.error('An error occurred while connecting to the database:', error);
    throw error;
  }
}

module.exports = connect;
