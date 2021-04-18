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
// Las tablas
db.Usuario = require("./user.model.js")(sequelize, Sequelize);
db.Rol = require("./rol.model.js")(sequelize, Sequelize);
db.Departamento = require("./departamento.model.js")(sequelize, Sequelize);
db.DiaPresencial = require("./diapresencial.model.js")(sequelize, Sequelize);
db.EstadoDia = require("./estadodia.model.js")(sequelize, Sequelize);
// Las relaciones
db.Usuario.Rol = db.Usuario.belongsTo(db.Rol);
db.Usuario.Departamento = db.Usuario.belongsTo(db.Departamento);
db.DiaPresencial.Usuario = db.DiaPresencial.belongsTo(db.Usuario);
db.DiaPresencial.EstadoDia = db.DiaPresencial.belongsTo(db.EstadoDia);

var rol_es6 = require("./rol_es6.js");
db.rol_es6 = rol_es6.init(sequelize, Sequelize);

module.exports = db;
