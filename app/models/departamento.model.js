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
      },
    },
    {
      // Elimino el cambio de nombre en la tabla
      freezeTableName: true,
    }
  );

  return Departamento;
};
