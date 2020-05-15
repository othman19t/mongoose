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

// read all users when request is been made
app.get("/users", (req, res) => {
  User.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send();
    });
});

// read single user 
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      if (err) {
        res.status(404).send("users is not found");
      }
    });
});

// listening on post 3000 any other
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
