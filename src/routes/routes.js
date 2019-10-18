const express = require('express')
const router = express.Router()

const characterService = require("../services/characterService")
const CharacterService = new characterService()
const taskService = require("../services/taskService");
const TaskService = new taskService();

router.get('/api/doppelgangers', async (req, res) => {
    const response = await CharacterService.findCharacters()
    res.send(response).status(200)
})

router.get('/api/teste', async (req, res) => {
    const response = await TaskService.run();
    res.send(response).status(200)
})

module.exports = router