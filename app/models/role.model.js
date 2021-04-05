module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    idRol: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Rol: {
      type: Sequelize.STRING,
    },
  });

  return Role;
};
