module.exports = {
  HOST: "mariadb",
  USER: "root",
  PASSWORD: "qwerty",
  DB: "TurnosTeletrabajo",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
