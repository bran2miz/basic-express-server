'use strict';
// must install sequelize
const {Sequelize, DataTypes} = require('sequelize');
const people = require("./people.model.js")

// Lab 04 collection new stuff

//customer and order functions that create the model


const order = require('./order.model.js');
const customer = require('./customer.model.js');
const Collection = require('./collection.js');


// connect to our db this way:
// URI:uniform resource identifier
// URL: uniform resource locator
const POSTGRES_URI= process.env.NODE_ENV === 'test' ? 'sqlite:memory:' :process.env.DATABASE_URI;

//What is sqlite:memory?
// sqlite implements SQL database engine
// force it to store into memory by passing the string ':memory'. 

//there is a temporary in memory db created when you use sqlite:memory: (erases when disconnecting frm db)

let sequelize = new Sequelize(POSTGRES_URI);

// call the functions and set them to variables to make the models
const customerModel = customer(sequelize, DataTypes);

const orderModel = order(sequelize, DataTypes);

// make the associations
// has many orderModels within customerModel
customerModel.hasMany(orderModel, {
    // foreignKey option accepts string or an object
    // creates foreign key in customerModel
    // string or object will be used as the definition for the column in the table
    foreignKey: 'customerId',
    sourceKey: 'id',
});

orderModel.belongsTo(customerModel, {
    foreignKey: 'customerId',
    targetKey: 'id',
});

// create a new Collection class for each model
// use collection class to make each model an instance of it.
// add methods to the already known model

const customerCollection = new Collection(customerModel);

const orderCollection = new Collection(orderModel);

module.exports={dbInstance: sequelize, People: people(sequelize, DataTypes), customerCollection, orderCollection,
}