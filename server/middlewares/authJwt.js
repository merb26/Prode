const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.status(401).send({ message: "Unauthorized" });
};

verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"]; /*|| req.session.token*/
  console.log("REQ", req.headers);
  console.log("VERIFYTOKEN", token);

  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return catchError(err, res);
    }
    req.id = decoded.id;

    next();
  });
};

const authJwt = { verifyToken };

module.exports = authJwt;
