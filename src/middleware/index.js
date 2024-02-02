const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .send({ error: "Access denied. Insufficient Permission." });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};


module.exports = authenticate;