const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// save data into users collection when post request is made
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// save data into tasks collection when post request is made
app.use("/task", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// listening on post 3000 any other
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
