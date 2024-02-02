const { v4: uuidv4 } = require("uuid");
const pool = require("./init");
const { DBErrorLogger } = require("./util");

const getEmployeeById = async (id) => {
  try {
    const response = await pool.query(
      `SELECT * FROM employees WHERE _id = $1`,
      [id]
    );

    if (response.rows.length) {
      return response.rows.pop();
    }
    return null;
  } catch (error) {
    DBErrorLogger(error);
    throw error;
  }
};

const deleteEmployeeById = async (id) => {
  try {
    return await pool.query(`DELETE FROM employees WHERE _id = $1`, [id]);
  } catch (error) {
    DBErrorLogger(error);
    throw error;
  }
};

const updateEmployeeById = async (args) => {
  const { firstName, lastName, position, id } = args;
  try {
    const response = await pool.query(
      "UPDATE employees SET first_name = $1, last_name = $2, position = $3, updated_at = NOW() WHERE _id = $4 RETURNING *",
      [firstName, lastName, position, id]
    );
    return response.rows.pop();
  } catch (error) {
    DBErrorLogger(error);
    throw error;
  }
};

const getAllEmployees = async () => {
  try {
    const response = await pool.query(`SELECT * FROM employees`);
    if (response.rows.length) {
      return response.rows;
    }
    return [];
  } catch (error) {
    DBErrorLogger(error);
    throw error;
  }
};

const createEmployee = async (args) => {
  const { firstName, lastName, position } = args;
  try {
    const response = await pool.query(
      `INSERT INTO employees (_id, first_name, last_name, position) VALUES ($1, $2, $3, $4) RETURNING *`,
      [uuidv4(), firstName, lastName, position]
    );

    return response.rows.pop();
  } catch (error) {
    DBErrorLogger(error);
    throw error;
  }
};

module.exports = {
  getEmployeeById,
  createEmployee,
  getAllEmployees,
  deleteEmployeeById,
  updateEmployeeById,
};
