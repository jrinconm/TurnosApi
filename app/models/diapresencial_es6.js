const Sequelize = require("sequelize");
class DiaPresencial extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        dia: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
      },
      {
        // Elimino el cambio de nombre en la tabla
        freezeTableName: true,
        sequelize,
      }
    );
  }
  static associate(models) {
    this.Usuario = this.belongsTo(models.Usuario);
    this.Estado = this.belongsTo(models.EstadoDia);
  }
  static getId(where) {
    return this.findOne({
      where,
      attributes: ["id"],
      order: [["createdAt", "DESC"]],
    });
  }
  static getDesc(where) {
    return this.findOne({
      where,
      attributes: ["descripcion"],
      order: [["createdAt", "DESC"]],
    });
  }
}
module.exports = DiaPresencial;
