const mongoose = require("mongoose");
//Define a model
const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
});
module.exports = Task;
