const db = require("../models/index");
const { DataTypes } = require("sequelize");

const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");

const Users = db.define("users", {
  name: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  sector: {
    type: DataTypes.STRING,
  },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  suscripcion: { type: DataTypes.BOOLEAN, defaultValue: false },
  preference_id: { type: DataTypes.STRING },
});

const Pronostico = db.define("pronosticos", {
  matchId: {
    type: DataTypes.INTEGER,
    unique: false,
  },
  winner: {
    type: DataTypes.STRING,
  },
  goalHome: {
    type: DataTypes.INTEGER,
  },
  goalAway: {
    type: DataTypes.INTEGER,
  },
});

//REFRESH TOKEN
const RefreshToken = db.define("refreshTokens", {
  token: {
    type: DataTypes.STRING,
  },
  expiryDate: {
    type: DataTypes.DATE,
  },
  // userId: {
  //   type: DataTypes.STRING,
  // },
});

RefreshToken.createToken = async function (user) {
  let expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
  let _token = uuidv4();

  let refreshToken = await RefreshToken.create({
    token: _token,
    userId: user.id,
    expiryDate: expiredAt.getTime(),
  });
  return refreshToken.token;
};

RefreshToken.verifyExpiration = (token) => {
  console.log(token.expiryDate.getTime(), new Date().getTime());
  return token.expiryDate.getTime() < new Date().getTime();
};

//RELATIONSHIPS

Users.hasMany(Pronostico, { as: "pronosticos" });
Pronostico.belongsTo(Users, { foreignKey: "userId", as: "user" });

//Users.hasOne(RefreshToken, { as: "user" });
RefreshToken.belongsTo(Users, { foreignKey: "userId", as: "user" });

module.exports = { Users, Pronostico, RefreshToken };
