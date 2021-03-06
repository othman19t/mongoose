const express = require("express");
const Task = require("../models/task.js");
const router = new express.Router();
// Async-Await create a task when post request is made
router.post("/task", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Async-Await read all tasks from database
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Async-Await read one record from tasks by id
router.get("/task/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    res.status(200).send(task);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Async-Await update task by id
router.patch("/task/:id", async (req, res) => {
  // limit what user can update
  const update = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOperation = update.every((update) =>
    allowedUpdates.includes(update)
  );
  // check what the limits for updating a record
  if (!isValidOperation) {
    return res.status(400).send({ Error: "Invalid updates!" });
  }
  try {
    const _id = req.params.id;
    const newData = req.body;
    // modify code to work with middleware
    const task = await Task.findById(_id);
    update.forEach((update) => (task[update] = newData[update]));
    await task.save();
    res.status(200).send(task);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Async-Await delete a  task by id
router.delete("/task/:id", async (req, res) => {
  try {
    // modify code to work with middleware
    const _id = req.params.id;
    const task = await Task.findById(_id);
    update.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    if (!task) {
      return res.status(404).send({ Error: "Task does not exist!" });
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
