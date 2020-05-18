const express = require("express");
const User = require("../models/user");
const router = new express.Router();

// Async-Await create user when post request is made
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// to login users
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (err) {
    res.status(400).send();
  }
});

//Async-Await read all users when request is been made
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Async-Await read single user
router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Async-Await update user by id
router.patch("/users/:id", async (req, res) => {
  // limit what user can update
  const update = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = update.every((update) =>
    allowedUpdates.includes(update)
  );

  // to check the update limit
  if (!isValidOperation) {
    return res.status(400).send({ "Error: ": "Invalid updates!" });
  }
  try {
    const _id = req.params.id;
    const NewData = req.body;
    //modifying the update code to work with hashing the password
    const user = await User.findById(_id);
    update.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Async-Await delete user by id
router.delete("/user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send({ Error: "User does not exist!!" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
