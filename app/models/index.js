const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

// La libreria
db.Sequelize = Sequelize;
// La funcion
db.sequelize = sequelize;
// Las clases y tablas
var Rol = require("./rol_es6.js");
var EstadoDia = require("./estadodia_es6.js");
var Departamento = require("./departamento_es6.js");
var DiaPresencial = require("./diapresencial_es6.js");
var Usuario = require("./user_es6.js");
// Inicializo
db.Rol = Rol.init(sequelize, Sequelize);
db.EstadoDia = EstadoDia.init(sequelize, Sequelize);
db.Departamento = Departamento.init(sequelize, Sequelize);
db.DiaPresencial = DiaPresencial.init(sequelize, Sequelize);
db.Usuario = Usuario.init(sequelize, Sequelize);
// Creo las asociaciones
Object.values(db)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(db));

module.exports = db;
