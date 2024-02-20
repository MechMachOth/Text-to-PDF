import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const mysqlConnection1 = mysql.createPool({
    host: process.env.MYSQL_HOST_LISTENER_01,
    user: process.env.MYSQL_USER_LISTENER_01,
    password: process.env.MYSQL_PASSWORD_LISTENER_01,
    database: process.env.MYSQL_DATABASE_LISTENER_01,
    timezone: 'utc'
});

const mysqlConnection2 = mysql.createPool({
    host: process.env.MYSQL_HOST_LISTENER_02,
    user: process.env.MYSQL_USER_LISTENER_02,
    password: process.env.MYSQL_PASSWORD_LISTENER_02,
    database: process.env.MYSQL_DATABASE_LISTENER_02,
    timezone: 'utc'
});

const mysqlConnection3 = mysql.createPool({
    host: process.env.MYSQL_HOST_LISTENER_03,
    user: process.env.MYSQL_USER_LISTENER_03,
    password: process.env.MYSQL_PASSWORD_LISTENER_03,
    database: process.env.MYSQL_DATABASE_LISTENER_03,
    timezone: 'utc'
});

const mysqlConnection4 = mysql.createPool({
    host: process.env.MYSQL_HOST_LISTENER_04,
    user: process.env.MYSQL_USER_LISTENER_04,
    password: process.env.MYSQL_PASSWORD_LISTENER_04,
    database: process.env.MYSQL_DATABASE_LISTENER_04,
    timezone: 'utc'
});

mysqlConnection1.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à la base de données MySQL Listener 01:', err);
    } else {
        console.log('Connected to MySQL Listener 01!');
        console.log('Using database: ' + process.env.MYSQL_DATABASE_LISTENER_01);
    }
});

mysqlConnection2.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à la base de données MySQL Listener 02:', err);
    } else {
        console.log('Connected to MySQL Listener 02!');
        console.log('Using database: ' + process.env.MYSQL_DATABASE_LISTENER_02);
    }
});

mysqlConnection3.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à la base de données MySQL Listener 03:', err);
    } else {
        console.log('Connected to MySQL Listener 03!');
        console.log('Using database: ' + process.env.MYSQL_DATABASE_LISTENER_03);
    }
});

mysqlConnection4.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à la base de données MySQL Listener 04:', err);
    } else {
        console.log('Connected to MySQL Listener 04!');
        console.log('Using database: ' + process.env.MYSQL_DATABASE_LISTENER_04);
    }
});

export { mysqlConnection1, mysqlConnection2, mysqlConnection3, mysqlConnection4 };

