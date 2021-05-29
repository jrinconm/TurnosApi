const Sequelize = require("sequelize");
class DiaPresencial extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        dia: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          unique: "clavecompuesta",
        },
        estado: {
          type: Sequelize.STRING,
        },
      },
      {
        // Elimino el cambio de nombre en la tabla
        freezeTableName: true,
        sequelize,
        indexes: [
          // Create a unique index on email
          {
            unique: true,
            fields: ["dia", "UsuarioId"],
          },
        ],
      }
    );
  }
  static associate(models) {
    (this.Usuario = this.belongsTo(models.Usuario)),
      { foreignKey: "clavecompuesta" };
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
