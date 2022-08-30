const authJwt = require("../middlewares/authJwt");
//const controller = require("../controllers/");
const { Users } = require("../models/models");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get(
    "/user",
    [authJwt.verifyToken],
    (req, res) => res.send(true)

    //console.log(`VERIFY TOKEN ${authJwt.verifyToken}`);
  );

  app.get("/allusers", async (req, res) => {
    const allUsers = await Users.findAll();
    const aux = allUsers.map((user) => {
      return {
        id: user.dataValues.id,
        name: user.dataValues.name,
        lastname: user.dataValues.lastname,
        sector: user.dataValues.sector,
      };
    });
    res.status(200).send(aux);
  });
};
