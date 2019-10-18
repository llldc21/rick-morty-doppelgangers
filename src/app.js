require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/database/database')

db.on("error", console.error.bind(console, "MongoDB connection error:"))

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/routes'))

const port = process.env.PORT || 8080
const host = process.env.HOST || '0.0.0.0'
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})