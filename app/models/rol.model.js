module.exports = (sequelize, Sequelize) => {
  const Rol = sequelize.define(
    "rol",
    {
      id_rol: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      rol: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      // Elimino el cambio de nombre en la tabla
      freezeTableName: true,
    }
  );

  return Rol;
};
