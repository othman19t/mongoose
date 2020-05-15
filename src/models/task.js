const mongoose = require("mongoose");
//Define a model
const Task = mongoose.model("Task", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});
module.exports = Task;
