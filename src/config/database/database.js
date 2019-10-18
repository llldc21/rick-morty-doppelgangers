const mongoose = require('mongoose')

mongoose.connect("mongodb://mongodb:27017/doppelgangers", { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.Promise = global.Promise;

const db = mongoose.connection;

module.exports = db