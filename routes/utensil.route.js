'use strict';

const express = require('express');

const { UtensilCollection, MealCollection} = require('../models/index.model.js');

const router = express.Router();

// RESTful route declarations
router.get('/utensil', getUtensils);
router.get('/utensil/:id', getOneUtensil);
router.post('/utensil', createUtensil);
// router.put('/utensil/:id', updateUtensil);
// router.delete('/utensil/:id', deleteUtensil);

//route handlers
async function createUtensil(req,res) {
    let bodyObj = req.body;
    let newUtensil = await UtensilCollection.create(bodyObj);
    res.status(200).json(newUtensil);
}

async function getUtensils(req,res) {
    let allUtensils = await UtensilCollection.read(null, {include: {model: MealCollection.model}});
    res.status(200).json(allUtensils);
};

async function getOneUtensil(req,res) {
    let id = req.params.id;
    let allUtensils = await UtensilCollection.read(id, {include: {model: MealCollection.model}});

    res.status(200).json(allUtensils);
};

module.exports = router;