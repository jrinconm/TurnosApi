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

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require("./user.model.js")(sequelize, Sequelize);
db.Rol = require("./role.model.js")(sequelize, Sequelize);

db.Usuario.belongsTo(db.Rol);

module.exports = db;
