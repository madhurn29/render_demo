const express = require("express");
const app = express();
const { connection } = require("./Config/db");
require("dotenv").config();

var cors = require("cors");
const { userRouter } = require("./Routes/user.route");
const { employeeRouter } = require("./Routes/employee.route");
const { Auth } = require("./Middleware/auth.middleware");
app.use(express.json());

app.use(cors());

app.use("/user", userRouter);
app.use(Auth);
app.use("/employee", employeeRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error, "from connection");
  }
  console.log("listening on port" + " " + process.env.PORT);
});
