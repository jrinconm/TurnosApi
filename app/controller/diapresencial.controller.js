const { Sequelize } = require("sequelize");
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
    return;
  }
  // Si no hay estado dia lo pongo como provisional
  let estadodia = req.body.estadodia ? req.body.estadodia : "Provisional";

  // Creo el objeto del cuerpo de la peticion
  const diapresencial = {
    dia: req.body.dia,
    UsuarioId: req.body.usuario,
    estado: estadodia,
  };

  // Lo guardo en la BBDD
  DiaPresencial.create(diapresencial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al crear el dia presencial." + err.message,
      });
    });
};

// Obtener todos
exports.findAll = (req, res) => {
  DiaPresencial.findAll({
    include: [
      { model: db.Usuario, attributes: ["username", "rol", "departamento"] },
    ],
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

// Buscar por dia
exports.findOne = (req, res) => {
  const diapresencial = req.query.dia;
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
      UsuarioId: { [Op.eq]: `${usuario}` },
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
// Read -- Buscar por mes
exports.findByMes = (req, res) => {
  const mes = req.query.mes;
  const anyo = req.query.anyo;
  // El mes empieza en 0
  let inicio = new Date(anyo, parseInt(mes - 1));
  let fin = new Date(anyo, parseInt(mes));
  DiaPresencial.findAll({
    where: {
      dia: {
        [Op.gte]: inicio,
        [Op.lt]: fin,
      },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving mes " + mes + " " + err,
      });
    });
};

// Read -- Buscar por mes y nombre
exports.findByNameyMes = (req, res) => {
  const mes = req.query.mes;
  const anyo = req.query.anyo;
  const usuario = req.query.usuario;
  // El mes empieza en 0
  let inicio = new Date(anyo, parseInt(mes - 1));
  let fin = new Date(anyo, parseInt(mes));
  DiaPresencial.findAll({
    where: {
      UsuarioId: { [Op.eq]: `${usuario}` },
      dia: {
        [Op.gte]: inicio,
        [Op.lt]: fin,
      },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving mes " + mes + " " + err,
      });
    });
};
// Busqueda por departamento
exports.findByDep = (req, res) => {
  const departamento = req.query.departamento;
  DiaPresencial.findAll({
    include: [
      {
        model: db.Usuario,
        attributes: ["rol", "departamento"],
        where: {
          departamento: { [Op.eq]: `${departamento}` },
        },
      },
    ],
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
// Busqueda por usuarios de departamento
exports.findByUserDep = (req, res) => {
  const idUsuario = req.query.id;
  // Toca hacer una subconsulta
  let consulta =
    "(SELECT departamento FROM Usuario WHERE id = " + idUsuario + ")";

  DiaPresencial.findAll({
    include: [
      {
        model: db.Usuario,
        as: "Usuario",
        attributes: ["id", "username", "icono", "color", "departamento"],
        where: {
          "$Usuario.departamento$": {
            [Op.eq]:
              //`${idUsuario}`
              Sequelize.literal(consulta),
          },
        },
      },
    ],
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
//Borrar por id
exports.delete = (req, res) => {
  const id = req.query.id;
  DiaPresencial.destroy({
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
  DiaPresencial.update(req.body, {
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
