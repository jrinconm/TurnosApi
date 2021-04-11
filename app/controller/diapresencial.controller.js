const db = require("../models");
const DiaPresencial = db.DiaPresencial;
// Operadores de Sequelize para condiciones
const Op = db.Sequelize.Op;

// Crear dia
exports.create = (req, res) => {
  // Tiene que venir diapresencia y usuario
  if (!req.body.dia || !req.body.usuario) {
    res.status(400).send({
      message: "Es necesario dia y usuario",
    });
    console.log(req.body);
    return;
  }
  // Si no hay estado dia lo pongo como provisional
  let estadodia = req.body.estadodia ? req.body.estadodia : "1";

  // Creo el objeto del cuerpo de la peticion
  const diapresencial = {
    dia: req.body.dia,
    usuarioIdUsuario: req.body.usuario,
    estadoDiumIdEstadoDia: estadodia,
  };

  // Lo guardo en la BBDD
  DiaPresencial.create(diapresencial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al crear el dia presencial.",
      });
    });
};

// Obtener todos
exports.findAll = (req, res) => {
  DiaPresencial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los dias.",
      });
    });
};

// Buscar por dia
exports.findOne = (req, res) => {
  const diapresencial = req.params.dia;

  DiaPresencial.findAll({
    where: {
      dia: { [Op.eq]: `${diapresencial}` },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving dia " + diapresencial + " " + err,
      });
    });
};

// Busqueda por usuario
exports.findByName = (req, res) => {
  const usuario = req.query.usuario;

  DiaPresencial.findAll({
    where: {
      usuarioIdUsuario: { [Op.eq]: `${usuario}` },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los dias.",
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
