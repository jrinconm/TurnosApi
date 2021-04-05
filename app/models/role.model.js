module.exports = (sequelize, Sequelize) => {
  const Rol = sequelize.define("rol", {
    id_rol: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rol: {
      type: Sequelize.STRING,
    },
  });

  return Rol;
};
