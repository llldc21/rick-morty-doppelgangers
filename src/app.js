require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cron = require('node-cron')
const db = require("./config/database/database");
const taskService = require("./services/taskService");
const TaskService = new taskService();

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
  await TaskService.run();
  next();
});

app.use(require("./routes/routes"));

cron.schedule("0 */8 * * *", async () => {
  await TaskService.runTask()
  return true
})

const port = process.env.PORT || 1234;
const host = process.env.HOST || "0.0.0.0";
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
