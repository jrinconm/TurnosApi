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
  const id = req.query.id;

  EstadoDia.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving estado with id=" + id + " " + err,
      });
    });
};

//Borrar por id
exports.delete = (req, res) => {
  const id = req.query.id;
  EstadoDia.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dia borrado correctamente",
        });
      } else {
        res.send({
          message: `No se ha podido borrar dia con el id=${id}. `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se ha podido borrar dia con el id=" + id + " " + err,
      });
    });
};

// Actualizar por id
exports.update = (req, res) => {
  const id = req.query.id;
  EstadoDia.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Dia actualizado correctamente.",
        });
      } else {
        res.send({
          message: `No se puede actualizar dia con id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se ha podido actualizar dia con el id=" + id + " " + err,
      });
    });
};
