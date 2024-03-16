'use strict';
// must install sequelize
const {Sequelize, DataTypes} = require('sequelize');
const people = require("./people.model.js")

// connect to our db this way:
// URI:uniform resource identifier
// URL: uniform resource locator
const POSTGRES_URI= process.env.NODE_ENV === 'test' ? 'sqlite:memory:' :process.env.DATABASE_URI;

//What is sqlite:memory?
// sqlite implements SQL database engine
// force it to store into memory by passing the string ':memory'. 

//there is a temporary in memory db created when you use sqlite:memory: (erases when disconnecting frm db)

let sequelize = new Sequelize(POSTGRES_URI);

module.exports={dbInstance: sequelize, People: people(sequelize, DataTypes),
}