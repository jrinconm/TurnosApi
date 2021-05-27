const Sequelize = require("sequelize");
class Usuario extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
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
        rol: {
          type: Sequelize.STRING,
        },
        icono: {
          type: Sequelize.STRING,
        },
        color: {
          type: Sequelize.STRING,
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
    this.Dep = this.belongsTo(models.Departamento);
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
module.exports = Usuario;
