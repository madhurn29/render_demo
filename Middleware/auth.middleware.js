var jwt = require("jsonwebtoken");

async function Auth(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    try {
      var decoded = jwt.verify(token, "mock-12");

      next();
    } catch (error) {
      res.status(400).send({ message: error.message, from: "auth" });
    }
  } else {
    res.status(401).send({ message: "Invalid token" });
  }
}

module.exports = { Auth };
