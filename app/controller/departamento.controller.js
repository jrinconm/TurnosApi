const db = require("../models");
const Departamento = db.Departamento;
// Operadores de Sequelize para condiciones
const Op = db.Sequelize.Op;

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

// Obtener todos
exports.findAll = (req, res) => {
  Departamento.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los departamentos.",
      });
    });
};

// Buscar por id
exports.findOne = (req, res) => {
  const id_departamento = req.params.id;

  Departamento.findByPk(id_departamento)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving Departamento with id=" +
          id_departamento +
          " " +
          err,
      });
    });
};

// Busqueda por nombre
exports.findByName = (req, res) => {
  const departamento = req.query.departamento;

  Departamento.findAll({
    where: { departamento: { [Op.like]: `%${departamento}%` } },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los departamentos.",
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
