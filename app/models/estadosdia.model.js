module.exports = (sequelize, Sequelize) => {
  const EstadoDia = sequelize.define("estado_dia", {
    id_estado_dia: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estado: {
      type: Sequelize.STRING,
    },
  });

  return EstadoDia;
};
