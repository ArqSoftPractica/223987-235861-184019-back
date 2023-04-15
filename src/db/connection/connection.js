require('dotenv').config();
const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');
const dbUri = process.env.MY_SQL_URI || "localhost";
const dbPassword = process.env.DB_PASSWORD || "asp2023**";
const User = require('../models/users')
const Company = require('../models/company')
const Provider = require('../models/provider')

const sequelize = new Sequelize(
    'asp-obli-1',
    'root',
    dbPassword,
     {
       host: dbUri,
       dialect: 'mysql'
     }
   );

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  })

sequelize
  .addHook('afterConnect', (connection) => {
    connection.on('error', (error) => {
      console.error('Sequelize connection error:', error);
    });
  
    connection.on('end', () => {
      console.error('Sequelize connection disconnected.');
    });
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.company = Company(sequelize, DataTypes);
db.user = User(sequelize, DataTypes, db.company);
db.provider = Provider(sequelize, DataTypes);

module.exports = db;
