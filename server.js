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

//Descomentar si queremos resetear la BBDD
/*
const db = require("./app/models");
var mysql = require("mysql");
// De momento para poner la contraseña a fuego
var bcrypt = require("bcryptjs");
let passwd = bcrypt.hashSync("azul", 8);
// Borrar en produccion
const Usuario = db.Usuario;
const Rol = db.Rol;
const Departamento = db.Departamento;
const DiaPresencial = db.DiaPresencial;
const EstadoDia = db.EstadoDia;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  poblar();
}); 

// Pueblo con datos de prueba
function poblar() {
  // Creo 3 roles
  ["Usuario", "Administrador", "Super"].forEach((dato) =>
    Rol.create({ descripcion: dato })
  );
  // Creo 3 departamentos
  ["Wintel", "Centrales", "Distribuidos"].forEach((dato) =>
    Departamento.create({ descripcion: dato })
  );
  // Creo 3 estados dia
  ["Propuesto", "Confirmado", "Cambiando"].forEach((dato) =>
    EstadoDia.create({ descripcion: dato })
  );
  // Creo 3 usuarios, uno de cada tipo
  [
    {
      username: "Pepe",
      email: "pepe@email.com",
      RolId: 1,
      password: passwd,
      DepartamentoId: 2,
    },
    {
      username: "Jose",
      email: "jose@email.com",
      RolId: 2,
      password: passwd,
      DepartamentoId: 2,
    },
    {
      username: "Josep",
      email: "josep@email.com",
      RolId: 3,
      DepartamentoId: 2,
    },
  ].forEach((dato) => Usuario.create(dato));
  // Relleno dias de trabajo de cada tipo
  [
    {
      dia: new Date(2021, 4, 15),
      UsuarioId: 1,
      EstadoDiumId: 1,
    },
    {
      dia: new Date(2021, 4, 16),
      UsuarioId: 2,
      EstadoDiumId: 1,
    },
    {
      dia: new Date(2021, 4, 17),
      UsuarioId: 1,
      EstadoDiumId: 2,
    },
    {
      dia: new Date(2021, 4, 11),
      UsuarioId: 1,
      EstadoDiumId: 1,
    },
    {
      dia: new Date(2021, 4, 12),
      UsuarioId: 2,
      EstadoDiumId: 1,
    },
    {
      dia: new Date(2021, 4, 9),
      UsuarioId: 1,
      EstadoDiumId: 2,
    },
  ].forEach((dato) => DiaPresencial.create(dato));
}

// Creo el scheduler de mysql para marcar como cerrados los dias

let conexion = mysql.createConnection({
  host: "127.0.0.1",
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
  conexion.query(element, function (err, result) {
    if (err) {
      throw err;
    } else {
      console.log(result);
    }
  })
);

conexion.end();
*/
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Sin acceso al raiz" });
});
require("./app/routes/departamento.routes")(app);
require("./app/routes/diapresencial.routes")(app);
require("./app/routes/estadodia.routes")(app);
require("./app/routes/rol.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
