const express = require("express");
const {
  getEmployee,
  postEmployee,
  deleteEmployee,
  editEmployee,
} = require("../Controller/employee.controller");
const employeeRouter = express.Router();

employeeRouter.get("/", getEmployee);
employeeRouter.post("/", postEmployee);
employeeRouter.patch("/:id", editEmployee);
employeeRouter.delete("/:id", deleteEmployee);

module.exports = { employeeRouter };
