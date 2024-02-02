const { v4: uuidv4 } = require("uuid");
const pool = require("./init");

const getUserByUsername = async (username) => {
  try {
    const response = await pool.query(
      `SELECT * FROM "user" WHERE username = $1`,
      [username]
    );
    if (response.rows.length) {
      return response.rows.pop();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const createUser = async (args) => {
  console.log(args);
  const { username, password, name } = args;
  try {
    return await pool.query(
      `INSERT INTO "user" (_id, username, password, name, created_at) VALUES ($1, $2, $3, $4, $5)`,
      [uuidv4(), username, password, name, new Date().toISOString()]
    );
  } catch (error) {
    console.log(error.detail);
    throw error;
  }
};

module.exports = {
  getUserByUsername,
  createUser,
};
