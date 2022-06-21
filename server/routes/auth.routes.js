const verifySignUp = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    next();
  });
  app.post("/signup", verifySignUp.checkDuplicatedEmail, controller.signup);
  app.post("/signin", controller.signin);
  //app.post("/signout", controller.signout);
};
