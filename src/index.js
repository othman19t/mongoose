const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Async-Await create user when post request is made
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Async-Await create a task when post request is made
app.post("/task", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
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

// getting all tasks from database
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

//getting one record from tasks by id
app.get("/task/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// listening on post 3000 any other
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
