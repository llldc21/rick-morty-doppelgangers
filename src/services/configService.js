const Config = require("../models/config");

class ConfigService {
  constructor() {
    this.config = Config;
  }

  async createConfig() {
    await this.config.create({ firstLoad: true });
  }

  async getFirstLoad() {
    const fl = await this.config.findOne({$or: [{firstLoad: true}, {firstLoad: false}]}).catch(error => {
      throw error;
    });
    if (!fl) {
      this.createConfig();
      return true;
    } else {
      return fl.firstLoad;
    }
  }

  async turnOffFirstload() {
    const params = {
      $set: {firstLoad: false}
    };
    const res = await this.config.updateOne({ firstLoad: true }, params);
    return res
  }
}

module.exports = ConfigService;
