const util = require("util");
const request = require("request");
const characterService = require("./characterService");

class DimensionsService {
  constructor() {
    this.request = util.promisify(request);
    this.CharacterService = new characterService();
    this.url =
      process.env.CHARACTER_URL || "https://rickandmortyapi.com/api/location/";
  }

  async run() {
    const req = await this.makeRequest(this.url);
    if (!req && req.body && req.body.info && req.body.info.pages) {
      throw new Error(`Pages not found`);
    } else {
      const pages = parseInt(req.body.info.pages) + 1;
      for (let i = 1; i != pages; i++) {
        const request = await this.makeRequest(`${this.url}?page=${i}`);
        await this.parseDimensionsData(request);
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

  async parseDimensionsData(requestData) {
    let data = {};
    data.pages = requestData.body.info.pages;
    data.characters = [];
    let results = requestData.body.results;
    for (let i = 0; i < results.length; ++i) {
      let params = results[i];
      let { residents, created } = params;
      data.residents = residents;
      data.created = created
    }
    await this.verifyCharacter(data.residents);
    return data;
  }

  async verifyCharacter(residents) {
    for (let i = 0; i < residents.length; i++) {
      let data = residents[i];
      const id = await this.removeNonNumeric(data);
      let characterExists = await this.CharacterService.findCharacterById(id);
      if (characterExists) {
        let dimensions_count = characterExists.dimensions_count;
        characterExists.dimensions_count = dimensions_count + 1;
        await this.CharacterService.updateCharacterById(characterExists);
      }
    }
    return true;
  }

  async removeNonNumeric(resident) {
    resident = resident.replace(/[^0-9]/g, "");
    console.log(resident)
    return resident;
  }
}

module.exports = DimensionsService;
