const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
// Obtengo el servidor de las variables de entorno
const HOST = process.env.DBHOST || config.HOST;
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: HOST,
  dialect: config.dialect,
  // Deshabilito la salida de las consultas a la consola node
  logging: false,
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
var DiaPresencial = require("./diapresencial_es6.js");
var Usuario = require("./user_es6.js");
// Inicializo
db.DiaPresencial = DiaPresencial.init(sequelize, Sequelize);
db.Usuario = Usuario.init(sequelize, Sequelize);
// Creo las asociaciones
Object.values(db)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(db));

module.exports = db;
