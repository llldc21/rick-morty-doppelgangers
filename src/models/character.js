const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let characterSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  dimensions_count: {
    type: Number,
    required: false,
    default: 0
  }
});

module.exports = mongoose.model("Character", characterSchema);
