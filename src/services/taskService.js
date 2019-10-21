const dimensionsService = require("./dimensionsService");
const requestService = require("./requestService");
const configService = require("./configService");

class TaskService {
  constructor() {
    this.DimensionsService = new dimensionsService();
    this.RequestService = new requestService();
    this.ConfigService = new configService();
  }

  async run() {
    const firstLoad = await this.ConfigService.getFirstLoad().catch(error => {
      throw error;
    });
    console.log(firstLoad);
    if (firstLoad === true) {
      console.log("*** RUNNING CHARACTERS SERVICE");
      await this.RequestService.run().catch(error => {
        throw error;
      });

      console.log("*** RUNNING DIMENSIONS SERVICE");
      await this.DimensionsService.run().catch(error => {
        throw error;
      });

      console.log("*** RUNNING TURN OFF FIRSTLOAD");
      const res = await this.ConfigService.turnOffFirstload().catch(error => {
        throw error;
      });
      console.log(res);
      return true;
    } else {
      console.log(`First load already run!`);
    }
  }

  async runTask() {
    console.log("*** RUNNING CHARACTERS SERVICE");
    await this.RequestService.run().catch(error => {
      throw error;
    });

    console.log("*** RUNNING DIMENSIONS SERVICE");
    await this.DimensionsService.run().catch(error => {
      throw error;
    });

    console.log("*** RUNNING TURN OFF FIRSTLOAD");
    const res = await this.ConfigService.turnOffFirstload().catch(error => {
      throw error;
    });
    console.log(res);
    return true;
  }
}

module.exports = TaskService;
