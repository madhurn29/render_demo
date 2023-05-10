const { query } = require("express");
const { EmployeeModel } = require("../Model/employee.model");

const getEmployee = async (req, res) => {
  const { department, salary, firstName, page, limit } = req.query;
  let pageLimit = limit || 5;
  let skipQuery = (page - 1) * pageLimit;

  let queryObj = {};

  if (department) {
    queryObj.department = department;
  }

  try {
    let getEmployee;

    if (page) {
      getEmployee = await EmployeeModel.find(queryObj)
        .skip(skipQuery)
        .limit(pageLimit);
    } else if (page && salary) {
      getEmployee = await EmployeeModel.find(queryObj)
        .sort({
          salary: salary === "asc" ? 1 : -1,
        })
        .skip(skipQuery)
        .limit(pageLimit);
    } else if (salary) {
      getEmployee = await EmployeeModel.find(queryObj).sort({
        salary: salary === "asc" ? 1 : -1,
      });
    } else {
      getEmployee = await EmployeeModel.find(queryObj);
    }

    res.status(200).send(getEmployee);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const postEmployee = async (req, res) => {
  console.log(req.body);
  try {
    const employee = new EmployeeModel(req.body);
    await employee.save();
    res.status(200).send({ message: "Employee saved successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const editEmployee = async (req, res) => {
  let { id } = req.params;
  let payload = req.body;
  try {
    await EmployeeModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ message: "Employee updated successfully" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  let { id } = req.params;
  try {
    await EmployeeModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Employee deleted successfully" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = { getEmployee, postEmployee, editEmployee, deleteEmployee };
