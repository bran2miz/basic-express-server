'use strict';

const express = require('express');

const { MealCollection } = require('../models/index.model.js');

const router = express.Router();

// RESTful route declarations
router.get('/Meal', getMeals);
router.get('/Meal/:id', getOneMeal);
router.post('/Meal', createMeal);
// router.put('/Meal/:id', updateMeal);
// router.delete('/Meal/:id', deleteMeal);

//route handlers
async function createMeal(req,res) {
    let bodyObj = req.body;
    let newMeal = await MealCollection.create(bodyObj);
    res.status(200).json(newMeal);
}

async function getMeals(req,res) {
    let allMeals = await MealCollection.read();
    res.status(200).json(allMeals);
};

async function getOneMeal(req,res) {
    let id = req.params.id;
    let allMeals = await MealCollection.read(id);
    res.status(200).json(allMeals);
};

module.exports = router;