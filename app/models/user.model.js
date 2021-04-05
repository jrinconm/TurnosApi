module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    id_usuario: {
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
    departamento_id: {
      type: Sequelize.INTEGER,
    },
  });

  return Usuario;
};
