const util = require("util");
const request = require("request");
const characterService = require("./characterService");

class RequestService {
  constructor() {
    this.request = util.promisify(request);
    this.CharacterService = new characterService();
    this.url =
      process.env.CHARACTER_URL || "https://rickandmortyapi.com/api/character/";
  }

  async run() {
    const req = await this.makeRequest(this.url);
    if (!req && req.body && req.body.info && req.body.info.pages) {
      throw new Error(`Pages not found`);
    } else {
      const pages = parseInt(req.body.info.pages) + 1;
      for (let i = 1; i != pages; i++) {
        const request = await this.makeRequest(`${this.url}?page=${i}`);
        await this.parseCharacterData(request);
      }
    }
  }

  async makeRequest(url) {
    let options = {
      method: "GET",
      url: url,
      headers: {},
      json: true
    };
    const response = this.request(options);
    return response;
  }

  async parseCharacterData(requestData) {
    let data = {};
    data.pages = requestData.body.info.pages;
    data.characters = [];
    let results = requestData.body.results;
    for (let i = 0; i < results.length; ++i) {
      let params = results[i];
      let { id, name, status, image } = params;
      data.characters.push({ id, name, status, image });
    }
    await this.verifyCharacter(data.characters)
    return data
  }

  async verifyCharacter(charactersData) {
    for (let i = 0; i < charactersData.length; i++) {
      let character = charactersData[i];
      let characterExists = await this.CharacterService.findCharacterById(
        character.id
      );
      if (!characterExists) {
        await this.CharacterService.createCharacter(character);
      }
    }
    return true;
  }
}

module.exports = RequestService;
