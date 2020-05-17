require("../db/mongoose");
const User = require("../models/user");
const Task = require("../models/task");

// update record and count records
const id = "5ebdfef9bef8661ebd47cf2e";
User.findByIdAndUpdate(id, { age: 1000 })
  .then((result) => {
    console.log(result);
    return User.countDocuments({ age: 1000 }).then((result) => {
      console.log(result);
    });
  })
  .catch((err) => {
    console.log(err);
  });


//load all tasks
Task.find({})
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
