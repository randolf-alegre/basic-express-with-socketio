const authService = require("../../service/auth/authService");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const SALT_ROUND = 10;

const register = async (req, res) => {
  try {
    const password = await generateSalt("asdf!@#$");
    const response = await authService.createNewUser({
      name: "randolf",
      username: "randolf4",
      password,
    });
    res.status(201).send(response);
  } catch (error) {
    throw error;
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const currUser = await authService.findUserByUsername(username);

  if (currUser) {
    const isValid = await validateUser(currUser.password, password);
    if (!isValid) {
      res
        .status(500)
        .send({ error: { message: "Invalid email and password." } });
      return false;
    }
  }
  const token = jwt.sign({ userId: currUser._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });

  res.status(200).send({ ...currUser, token });
};

const generateSalt = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

const validateUser = async (hash, password) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  register,
};
