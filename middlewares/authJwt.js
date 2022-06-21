const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

verifyToken = async (req, res, next) => {
  let token = req.session.token;
  console.log(`THIS IS THE TOKEN: ${token}`);
  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.id = decoded.id;

    next();
  });
};

const authJwt = { verifyToken };

module.exports = authJwt;
