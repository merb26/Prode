const { Users } = require("../models/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

exports.signup = async (req, res) => {
  try {
    const user = await Users.create({
      name: req.body.name,
      lastname: req.body.lastname,
      sector: req.body.sector,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (user) {
      res.send({ used: false });
    }
  } catch (error) {
    console.log(err.message);
  }
};

exports.signin = async (req, res) => {
  //console.log(req.body);

  const user = await Users.findOne({
    where: { email: req.body.email },
  });

  try {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        suscription: user.suscripcion,
        preference: user.preference_id,
      },
      config.secret,
      {
        expiresIn: 84000, //24hours
      }
    );
    console.log("TOKEN", token);
    req.session.token = token;
    //console.log(req.session);
    //localStorage.setItem("user", token);

    return res.status(200).send({
      isLogged: true,
      id: user.id,
      email: user.email,
      suscripcion: user.suscripcion,
      preference_id: user.preference_id,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "Signed Out" });
  } catch (error) {
    this.next(err);
  }
};
