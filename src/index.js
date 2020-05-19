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

// exploring jsonwebtoken for authenticating users
const jwt = require("jsonwebtoken"); // npm i jsonwebtoken
const myfun = async () => {
  const token = jwt.sign({ _id: "12345" }, "123456", { expiresIn: "7 days" });
  console.log(token);
  const data = jwt.verify(token, "123456");
  console.log(data);
};
myfun();
