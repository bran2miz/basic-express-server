//need express router
const express = require('express');

const { orderCollection } = require('../models/index.js');

const router = express.Router();

// RESTful route declarations
router.get('/orders', getOrders);
router.get('/orders/:id', getOneOrder);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

//route handlers
async function getOrders(req,res) {
    // accessing collection functions when you createa new collection in index 
    let allOrders = await orderCollection.read();
    res.status(200).json(allOrders);
};

async function getOneOrder(req,res) {
    let id = req.params.id;
    let theOrder = await orderCollection.read(id);
    res.status(200).json(theOrder);
};

async function createOrder(req,res) {
    let bodyObj = req.body;
    let newOrder = await orderCollection.create(bodyObj);
    res.status(200).json(newOrder);
}

async function updateOrder(req,res) {
    let id = req.params.id;
    let bodyObj = req.body;
    let updatedOrder = await orderCollection.update(id, bodyObj)
    res.status(200).json(updatedOrder)
}

async function deleteOrder(req, res) {
    let id = req.params.id;
    let deletedOrder = await orderCollection.delete(id);
    res.status(204).send(deletedOrder)
}


module.exports = router;