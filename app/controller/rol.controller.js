const db = require("../models");
const Rol = db.Rol;
// Operadores de Sequelize para condiciones
// Dde momento no lo necesito
//const Op = db.Sequelize.Op;

// Crear un rol nuevo
exports.create = (req, res) => {
  // Tiene que venir diapresencia y usuario
  if (!req.body.rol) {
    res.status(400).send({
      message: "Es necesario rol",
    });
    console.log(req.body);
    return;
  }
  // Creo el objeto del cuerpo de la peticion
  const rol = {
    rol: req.body.rol,
  };

  // Lo guardo en la BBDD
  Rol.create(rol)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al crear el rol.",
      });
    });
};

// Obtener todos
exports.findAll = (req, res) => {
  Rol.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los roles.",
      });
    });
};

// Buscar por id
exports.findOne = (req, res) => {
  const idRol = req.params.id;

  Rol.findByPk(idRol)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving estado with id=" + idRol + " " + err,
      });
    });
};

/*
// Creo el skell basico
// Actualizar por id
exports.update = (req, res) => {};

//Borrar por id
exports.delete = (req, res) => {};
*/
