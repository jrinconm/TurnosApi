const db = require("../models");
const EstadoDia = db.EstadoDia;
// Operadores de Sequelize para condiciones
// Dde momento no lo necesito
//const Op = db.Sequelize.Op;

// Crear un estado nuevo
exports.create = (req, res) => {
  // Tiene que venir diapresencia y usuario
  if (!req.body.estado) {
    res.status(400).send({
      message: "Es necesario estado",
    });
    console.log(req.body);
    return;
  }
  // Creo el objeto del cuerpo de la peticion
  const estadodia = {
    estado: req.body.estado,
  };

  // Lo guardo en la BBDD
  EstadoDia.create(estadodia)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al crear el estado.",
      });
    });
};

// Obtener todos
exports.findAll = (req, res) => {
  EstadoDia.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los estado.",
      });
    });
};

// Buscar por id
exports.findOne = (req, res) => {
  const id_estado_dia = req.query.id;

  EstadoDia.findByPk(id_estado_dia)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving estado with id=" + id_estado_dia + " " + err,
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
