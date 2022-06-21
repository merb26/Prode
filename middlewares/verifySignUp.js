const { Users } = require("../models/models");

checkDuplicatedEmail = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).send({ used: true }); //email already in use
    }
    next();
  } catch (err) {
    return res.status(500).send({
      message: "Unable to validate Username!",
    });
  }
};

const verifySignUp = { checkDuplicatedEmail };

module.exports = verifySignUp;
