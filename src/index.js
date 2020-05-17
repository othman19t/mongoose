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

//Async-Await read all users when request is been made
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Async-Await read single user
app.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Async-Await read all tasks from database
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Async-Await read one record from tasks by id
app.get("/task/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    res.status(200).send(task);
  } catch (err) {
    res.status(404).send(err);
  }
});

// listening on post 3000 any other
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
