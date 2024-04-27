'use strict';
// must install sequelize
const {Sequelize, DataTypes} = require('sequelize');
// Sequelize is main class library which manages connections and interactions with databases
// DataTypes are used to define model attributes with specific data types (strings, integers, etc)

const people = require("./people.model.js")

// connect to our db this way:
// URI:uniform resource identifier
// URL: uniform resource locator
// below determines which database URI to use based on the environment the application is running in.
// if the environment variable 'NODE_EV' is set to 'test', it uses SQLite as an in-memory database.
// Otherwise it uses a PostgreSQL database URI defined by the environment variable 'DATABASE_URI'
// used for testing.
const POSTGRES_URI= process.env.NODE_ENV === 'test' ? 'sqlite:memory:' :process.env.DATABASE_URI;


//What is sqlite:memory?
// sqlite implements SQL database engine
// force it to store into memory by passing the string ':memory'. 

//there is a temporary in memory db created when you use sqlite:memory: (erases when disconnecting frm db)

// connected to the speicfied URI.
let sequelize = new Sequelize(POSTGRES_URI);

module.exports={dbInstance: sequelize, People: people(sequelize, DataTypes),
}
