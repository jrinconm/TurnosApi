const db = require("../models");
const Departamento = db.Departamento;
// Operadores de Sequelize para condiciones
//const Op = db.Sequelize.Op;

// Crear departamento
exports.create = (req, res) => {
  // Validate request
  if (!req.body.departamento) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    console.log(req.body);
    return;
  }
  // Creo el objeto del cuerpo de la peticion
  const departamento = {
    departamento: req.body.departamento,
  };

  // Lo guardo en la BBDD
  Departamento.create(departamento)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al crear el Departamento.",
      });
    });
};
/*
// Creo el skell basico
// Obtener todos
exports.findAll = (req, res) => {};

// Buscar por id
exports.findOne = (req, res) => {};

// Busqueda por nombre
exports.findByName = (req, res) => {};

// Actualizar por id
exports.update = (req, res) => {};

//Borrar por id
exports.delete = (req, res) => {};
*/
