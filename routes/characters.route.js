'use strict';

const express = require('express');
const { GameCharacters } = require('../models/index.model');

const router = express.Router();



// all route handlers are async because we interact w database
const getGameCharacters = async (req, res) => {
    //search db and recieve all games
    let allGames = await GameCharacters.findAll();
    res.status(200).json(allGames);
};

const getOneGameCharacters = async (req, res) => {
    //search db and recieve one game
    let id = parseInt(req.params.id);
    let recievedGame = await GameCharacters.findOne({where: {id : id} });
    res.status(200).json(recievedGame);
}

const createGameCharacters = async (req, res) => {
    //add one game to the db
    let newGame = req.body;
    let addedGame = await GameCharacters.create(newGame);
    res.status(200).json(addedGame);
};

const updateGameCharacters = async (req, res) => {
    //update an existing game(row) in the db
    let id = parseInt(req.params.id);
    let newGameInfo = req.body;
    let gameToUpdate = await GameCharacters.findOne({where : {id} });
    let updatedGame = await gameToUpdate.update(newGameInfo);
    res.status(200).json(updatedGame);
};

const deleteGameCharacters = async (req, res) => {
    //remove a game from the db
    let id = parseInt(req.params.id);
    let deletedGame = await GameCharacters.destroy({where : {id} });
    res.status(204).json(deletedGame);
};

router.get('/characters', getGameCharacters);
router.get('/characters/:id', getOneGameCharacters);
router.post('/characters', createGameCharacters);
router.put('/characters/:id', updateGameCharacters);
router.delete('/characters/:id', deleteGameCharacters);

module.exports = router;