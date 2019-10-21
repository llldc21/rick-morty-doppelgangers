const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let configSchema = new Schema({
  firstLoad: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Config", configSchema);
