'use strict';

const express = require('express');
const { CoolGames } = require('../models/index.model');

const router = express.Router();

// all route handlers are async because we interact w database
const getCoolGames = async (req, res) => {
    //search db and recieve all games
    let allGames = await CoolGames.findAll();
    res.status(200).json(allGames);
};

const getOneCoolGame = async (req, res) => {
    //search db and recieve one game
    let id = parseInt(req.params.id);
    let recievedGame = await CoolGames.findOne({where: {id : id} });
    res.status(200).json(recievedGame);
}

const createCoolGame = async (req, res) => {
    //add one game to the db
    let newGame = req.body;
    let addedGame = await CoolGames.create(newGame);
    res.status(200).json(addedGame);
};

const updateCoolGame = async (req, res) => {
    //update an existing game(row) in the db
    let id = parseInt(req.params.id);
    let newGameInfo = req.body;
    let gameToUpdate = await CoolGames.findOne({where : {id} });
    let updatedGame = await gameToUpdate.update(newGameInfo);
    res.status(200).json(updatedGame);
};

const deleteCoolGame = async (req, res) => {
    //remove a game from the db
    let id = parseInt(req.params.id);
    let deletedGame = await CoolGames.destroy({where : {id} });
    res.status(204).json(deletedGame);
};

router.get('/coolgames', getCoolGames);
router.get('/coolgames/:id', getOneCoolGame);
router.post('/coolgames', createCoolGame);
router.put('/coolgames/:id', updateCoolGame);
router.delete('/coolgames/:id', deleteCoolGame);

module.exports = router;