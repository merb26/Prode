const sequelize = require("sequelize")
require("dotenv").config



const devConfig = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`

const db = new sequelize(devConfig)

module.exports = db
