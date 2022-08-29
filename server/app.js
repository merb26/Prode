require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
//MIDDLEWARES
app.use(
  cookieSession({
    name: "prode_session",
    secret: "MIOURI_PRODE_SECRET", //add to .env variable
    httpOnly: false,
  })
);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.options("/*", (_, res) => {
  res.sendStatus(200);
});

module.exports = app;
