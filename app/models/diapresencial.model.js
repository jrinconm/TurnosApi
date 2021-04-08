module.exports = (sequelize, Sequelize) => {
  const DiaPresencial = sequelize.define(
    "dia_presencial",
    {
      dia: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    },
    {
      // Elimino el cambio de nombre en la tabla
      freezeTableName: true,
    }
  );

  return DiaPresencial;
};
