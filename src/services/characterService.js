const Character = require("../models/character");

class CharacterService {
  constructor() {
    this.character = Character;
  }

  async run() {
    return await this.findCharacters();
  }

  async findCharacters() {
    const params = await this.character.find({}).catch(error => {
      console.log(error);
    });

    let response = {
      status: "success",
      code: 200,
      messages: []
    };

    let result = [];

    for (let i = 0; i < params.length; ++i) {
      let data = params[i];
      result.push(data);
    }

    response.result = result;
    return response;
  }

  async findCharacterById(id) {
    const params = await this.character.findOne({ id: id }).catch(error => {
      throw error
    });
    return params;
  }

  async createCharacter(params) {
    await this.character.create(params);
  }

  async updateCharacterById(params) {
    await this.character.updateOne({ id: params.id }, params);
  }
}

module.exports = CharacterService;
