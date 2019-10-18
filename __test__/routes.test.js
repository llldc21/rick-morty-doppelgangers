const mongoose = require("mongoose");

const characterService = require("../src/services/characterService");
const requestService = require("../src/services/requestService");

const CharacterService = new characterService();
const RequestService = new requestService();

const characterUrl = "https://rickandmortyapi.com/api/character/?page=2";

describe("Testando seriço de personagens", () => {
  beforeAll(async () => {
    mongoose.connect("mongodb://localhost:27017/doppelgangers", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it("Deve retornar todos os personagens da base de dados", async done => {
    const res = await CharacterService.run();
    expect(typeof res).toEqual(typeof {});
    done();
  });
});

describe("Testando serviço de requisição", () => {
  beforeAll(async () => {
    mongoose.connect("mongodb://localhost:27017/doppelgangers", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  let requestData;
  it(`Requisição em ${characterUrl} deve retornar statusCode: 200`, async done => {
    const res = await RequestService.makeRequest(characterUrl);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("info");
    expect(res.body.info).toHaveProperty("pages");
    expect(res.body).toHaveProperty("results");

    requestData = res;
    done();
  });

  let charactersData;
  it(`Parseia dados da requisição em ${characterUrl}`, async done => {
    const res = await RequestService.parseCharacterData(requestData);
    expect(res).toHaveProperty("pages");
    expect(res.characters[1]).toHaveProperty("id");
    expect(res.characters[1]).toHaveProperty("name");
    expect(res.characters[1]).toHaveProperty("status");
    charactersData = res.characters;
    done();
  });

  it(`Verifica dados do personagem para cria-lo`, async done => {
    const res = await RequestService.verifyCharacter(charactersData);
    expect(res).toEqual(true);
    done();
  });
});
