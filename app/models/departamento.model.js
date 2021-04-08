module.exports = (sequelize, Sequelize) => {
  const Departamento = sequelize.define(
    "departamento",
    {
      id_departamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      departamento: {
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

  return Departamento;
};
