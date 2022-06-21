const authJwt = require("../middlewares/authJwt");
//const controller = require("../controllers/");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header({ "Access-Control-Allow-Origin": "*" });
    next();
  });
  app.get(
    "/user",
    [authJwt.verifyToken],
    (req, res) => res.send(req.session.token)

    //console.log(`VERIFY TOKEN ${authJwt.verifyToken}`);
  );
};
