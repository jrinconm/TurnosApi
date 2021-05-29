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
        nombre: {
          type: Sequelize.STRING,
          allowNull: false,
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
        departamento: {
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
