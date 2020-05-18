require("./db/mongoose");
const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// listening on post 3000 any other
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
