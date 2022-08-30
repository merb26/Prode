const { Users, RefreshToken } = require("../models/models");
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
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        sector: user.sector,
        email: user.email,
        suscription: user.suscripcion,
        preference: user.preference_id,
      },
      config.secret,
      {
        expiresIn: config.jwtExpiration, //24hours -- modify auth.config to test exp
      }
    );

    let refreshToken = await RefreshToken.createToken(user);

    //this is necessary? See authJwt.js
    //req.session.token = token;

    return res.status(200).send({
      isLogged: true,
      id: user.id,
      email: user.email,
      suscripcion: user.suscripcion,
      preference_id: user.preference_id,
      accessToken: token,
      refreshToken,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).send({ message: "Refresh Token is Required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });

    if (!refreshToken) {
      res.status(403).send({ message: "Refresh Token is not in DB" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      res.status(403).send({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const getUser = await RefreshToken.findOne({
      where: { userId: req.body.id },
    });
    let newAccessToken = jwt.sign({ id: getUser.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).send({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
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
