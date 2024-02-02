const {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  deleteEmployeeById,
  updateEmployeeById,
} = require("../../db/employee");

const createNewEmployee = async (args) => {
  try {
    const response = await createEmployee(args);
    return response;
  } catch (error) {
    throw error;
  }
};

const findEmployeeById = async (id) => {
  try {
    return await getEmployeeById(id);
  } catch (error) {
    throw error;
  }
};

const findAllEmployees = async () => {
  try {
    return await getAllEmployees();
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (id) => {
  try {
     await deleteEmployeeById(id);
     return;
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (args) => {
  try {
     return await updateEmployeeById(args);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewEmployee,
  findEmployeeById,
  findAllEmployees,
  deleteEmployee,
  updateEmployee
};
