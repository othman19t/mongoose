const mongoose = require("mongoose"); // npm i mongoose
// connecting to db
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
