module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("usuarios", {
    Idusuario: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    Departamento_idDepartamento: {
      type: Sequelize.INTEGER,
    },
    Rol_idRol: {
      type: Sequelize.INTEGER,
    },
  });

  return User;
};
