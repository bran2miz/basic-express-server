'use strict';

//need express router
const express = require('express');

const { customerCollection } = require('../models/index.js');

const router = express.Router();

// RESTful route declarations
router.get('/customers', getCustomers);
router.get('/customers/:id', getOneCustomer);
router.post('/customers', createCustomer);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

//route handlers
async function getCustomers(req,res) {
    // accessing collection functions when you createa new collection in index 
    let allCustomers = await customerCollection.read();
    res.status(200).json(allCustomers);
};

async function getOneCustomer(req,res) {
    let id = req.params.id;
    let theCustomer = await customerCollection.read(id);
    const orders = await theCustomer.getOrders();
    console.log(orders);
    res.status(200).json(theCustomer);
};

async function createCustomer(req,res) {
    let bodyObj = req.body;
    let newCustomer = await customerCollection.create(bodyObj);
    res.status(200).json(newCustomer);
}

async function updateCustomer(req,res) {
    let id = req.params.id;
    let bodyObj = req.body;
    let updatedCustomer = await customerCollection.update(id, bodyObj)
    res.status(200).json(updatedCustomer)
}

async function deleteCustomer(req, res) {
    let id = req.params.id;
    let deletedCustomer = await customerCollection.delete(id);
    res.status(204).send(deletedCustomer)
}


module.exports = router;