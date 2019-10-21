const express = require('express')
const router = express.Router()

const characterService = require("../services/characterService")
const CharacterService = new characterService()

router.get('/api/doppelgangers', async (req, res) => {
    const response = await CharacterService.findCharacters()
    res.send(response).status(200)
})

module.exports = router