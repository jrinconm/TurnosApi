const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// Deshabilitado para aceptar todos los origenes
var corsOptions = {
  origin: "http://jrincon.eu",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Descomentar si queremos resetear la BBDD
/*
const db = require("./app/models");
var mysql = require("mysql");
// De momento para poner la contraseña a fuego
var bcrypt = require("bcryptjs");
let passwd = bcrypt.hashSync("azul", 8);

const Usuario = db.Usuario;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  poblar();
});

// Pueblo con datos de prueba
function poblar() {
  // Creo 3 usuarios, uno de cada tipo
  [
    {
      username: "Pepe",
      email: "pepe@email.com",
      nombre: "Pepe de Dios",
      rol: "base",
      password: passwd,
      departamento: "administración",
    },
    {
      username: "Jose",
      email: "jose@email.com",
      rol: "gestor",
      nombre: "Jose Cortes",
      password: passwd,
      departamento: "administración",
    },
    {
      username: "Josep",
      email: "josep@email.com",
      nombre: "Josep Colom",
      rol: "admin",
      password: passwd,
      departamento: "administración",
    },
  ].forEach((dato) => Usuario.create(dato));
}

// Creo el scheduler de mysql para marcar como cerrados los dias
const config = require("./app/config/db.config.js");
const HOST = process.env.DBHOST || config.HOST;
let conexion = mysql.createConnection({
  host: HOST,
  port: 3306,
  user: "root",
  password: "qwerty",
});
conexion.connect();
conexion.query("use " + "TurnosTeletrabajo");

let consulta = [
  "SET GLOBAL event_scheduler = ON",
  "DROP EVENT IF EXISTS actualizador",
  "CREATE EVENT actualizador ON SCHEDULE EVERY 1 DAY STARTS CURRENT_TIMESTAMP DO update DiaPresencial set EstadoDiumId = 3 where dia < CURDATE();",
];
consulta.forEach((element) =>
  conexion.query(element, function (err) {
    if (err) {
      throw err;
    }
  })
);

conexion.end();
*/
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Sin acceso al raiz" });
});
require("./app/routes/diapresencial.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
