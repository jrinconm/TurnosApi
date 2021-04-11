module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define(
    "usuario",
    {
      id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
    },
    {
      // Elimino el cambio de nombre en la tabla
      freezeTableName: true,
    }
  );

  return Usuario;
};
