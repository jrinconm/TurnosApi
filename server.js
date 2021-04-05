const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Rol = db.Rol;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

function initial() {
  Rol.create({
    rol: "super",
  });

  Rol.create({
    rol: "gestor",
  });

  Rol.create({
    rol: "usuario",
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Sin acceso al raiz" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
