const dimensionsService = require("./dimensionsService");
const requestService = require("./requestService");

class TaskService {
  constructor() {
    this.DimensionsService = new dimensionsService();
    this.RequestService = new requestService();
  }

  async run() {
    console.log("*** RUNNING REQUEST SERVICE ***");
    await this.RequestService.run().catch(error => {
      console.log(error);
    });

    console.log("*** RUNNING DIMENSIONS SERVICE ***");
    await this.DimensionsService.run().catch(error => {
      console.log(error);
    });

    return true
  }
}

module.exports = TaskService;
