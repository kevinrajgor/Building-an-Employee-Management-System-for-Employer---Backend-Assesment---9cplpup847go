const Employee = require('../models/employeeModel');

//Registering Employee into database
const createEmployee = async (req, res) => {
  try {
    // Write a code here to store Employee data
    const employee = new Employee(req.body);
    const newEmployee = await employee.save();
    res.status(201).json({ newEmployee });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

//Get Employee From a Particular id
const getEmployee = async (req, res) => {
  try {
    // Write a code here to get Employee from a Particular id
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get employee details' });
  }
};

//Updating Employee
const updateEmployee = async (req, res) => {
  try {
    //Write a code here for updating Employee details using 'PUT' request
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee details updated successfully" });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee details' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    //Write a code here for Deleting all the employees whose salary is greater than 10000
    const result = await Employee.deleteMany({ salary: { $gt: 10000 } });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No employees found" });
    }
    res.status(200).json({ message: "Employees deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete employees' });
  }
};

module.exports = {
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
