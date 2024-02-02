const { createUser, getUserByUsername } = require("../../db/auth")

const createNewUser = async (args) => {
  try {
    const response = await createUser(args);
    return response;
  } catch (error) {
    throw error;
  }
}

const findUserByUsername = async (username) => {
  try {
    return await getUserByUsername(username);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createNewUser,
  findUserByUsername
}