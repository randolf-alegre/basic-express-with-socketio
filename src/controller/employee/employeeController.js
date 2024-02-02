const employeeService = require("../../service/employee/employeeService");

const create = async (req, res) => {
  try {
    const { firstName, lastName, position } = req.body;

    const response = await employeeService.createNewEmployee({
      firstName,
      lastName,
      position,
    });
    res.status(200).send({...response, message: "Employee created successfully!" });
    return response;
  } catch (error) {
    return res.status(500).send({ message: "Internal Server error." });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.query;
  let response = [];

  try {
    if (id) {
      response = await employeeService.findEmployeeById(id);

      if (!response) {
        res.status(404).send({ message: "Employee does not exist." });
        return false;
      }
    } else {
      response = await employeeService.findAllEmployees();
    }

    res
      .status(200)
      .send({ result: id && response ? { ...response } : [...response] });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server error." });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  let response = [];

  try {
    if (id) {
      response = await employeeService.findEmployeeById(id);

      if (!response) {
        res.status(404).send({ message: "Employee does not exist." });
        return false;
      }

      await employeeService.deleteEmployee(id);
      res
        .status(200)
        .send({ result: { message: "Employee deleted successfully." } });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server error." });
  }
};

const editEmployee = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, position } = req.body;
  let response = [];

  try {
    if (id) {
      response = await employeeService.findEmployeeById(id);

      if (!response) {
        res.status(404).send({ message: "Employee does not exist." });
        return false;
      }

      const updatedEmployee = await employeeService.updateEmployee({
        id,
        firstName,
        lastName,
        position,
      });

      res.status(200).send({ result: { ...updatedEmployee } });
      return updatedEmployee;

    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server error." });
  }
};

module.exports = {
  create,
  getEmployee,
  deleteEmployee,
  editEmployee,
};
