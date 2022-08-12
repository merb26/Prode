require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mercadopago = require("mercadopago");
const PORT = process.env.PORT || 3000;
const db = require("./models/index");
const { Users, Pronostico } = require("./models/models");
const emailSender = require("./controllers/contact.controller");
const app = express();

require("../server/middlewares/authJwt");
require("./middlewares/verifySignUp");

const ACCESS_TOKEN = "TEST-f5ddaa57-7f70-451f-b329-2c430b78ac8f";

const ACCESS_TOKEN_PRUEBA =
  "TEST-4192509694015148-052021-bba601e9fc2caf5e23355ccae89314a3-1127476200";

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

//ROUTES
require("../server/routes/auth.routes")(app);
require("../server/routes/user.routes")(app);

app.post("/pronosticos", async (req, res) => {
  try {
    await Pronostico.create({
      matchId: req.body.matchId,
      winner: req.body.winner,
      goalHome: req.body.goalHome,
      goalAway: req.body.goalAway,
      userId: req.body.userId,
    });

    res.send("Enviado");
  } catch (err) {
    console.log("ERROR en POST /pronosticos", err.message);
  }
});

app.get("/pronosticos", async (req, res) => {
  try {
    const usersPronostico = await Pronostico.findAll();
    res.send(usersPronostico);
  } catch (error) {
    console.log(error);
  }
});

//CONTACT

app.post("/contact", async (req, res) => {
  console.log(
    "EMAIL",
    await emailSender.main(req.name, req.email, req.textarea)
  );
  res.send(await emailSender.main(req.name, req.email, req.textarea));
});

//MP INTEGRATION
mercadopago.configure({ access_token: ACCESS_TOKEN_PRUEBA });

app.post("/api/orders", (req, res) => {
  const preference = {
    items: [
      {
        title: "Suscripción Prode",
        unit_price: 1250,
        quantity: 1,
        currency_id: "ARS",
      },
    ],
    payer: {
      name: req.body.name,
      surname: req.body.lastname,
      email: req.body.email,
    },
    back_urls: { success: "http://localhost:3001/login" },
    auto_return: "approved",
  };

  mercadopago.preferences.create(preference).then(async (preference) => {
    const payer = preference.body.payer.email;

    //Find and update user with preference_id
    const user = await Users.findOne({
      where: { email: payer },
    });
    await user.set({ preference_id: preference.body.id });
    await user.save();
    //console.log(await user);

    res.send(preference.body);
  });
});

app.post("/notify", async (req, res) => {
  const user = await Users.findOne({
    where: { preference_id: req.body.preference_id },
  });
  if (user) {
    await user.set({ suscripcion: true });
    await user.save();
  }
  res.send("APPROVED");
});

//SERVER AND DATABASE CONNECTION
const force = false;
db.sync(force).then(() => {
  console.log(`Connected to DB: ${process.env.DB || "Production DB"}  `);

  // https
  //   .createServer(
  //     {
  //       key: fs.readFileSync("server.key"),
  //       cert: fs.readFileSync("server.cert"),
  //     },
  //     app
  //   )
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT} `);
  });
});
