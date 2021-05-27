const db = require("../models");
const Usuario = db.Usuario;
// Operadores de Sequelize para condiciones
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
let sinpassword = {
  attributes: {
    exclude: ["password"],
  },
};
// Crear Usuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Es necesario el nombre de usuario!",
    });

    return;
  } else if (!req.body.email) {
    res.status(400).send({
      message: "Es necesario el correo electronico!",
    });

    return;
  } else if (!req.body.departamento) {
    res.status(400).send({
      message: "Es necesario indicar el departamento!",
    });

    return;
  }
  // Si no hay rol lo pongo como 1
  let rol = req.body.rol ? req.body.rol : "base";

  // Si no hay password lo pongo como null
  let pass = req.body.pass ? bcrypt.hashSync(req.body.pass, 8) : null;

  // Creo el objeto del cuerpo de la peticion
  const usuario = {
    username: req.body.username,
    email: req.body.email,
    password: pass,
    rol: rol,
    DepartamentoId: req.body.departamento,
  };

  // Lo guardo en la BBDD
  Usuario.create(usuario)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al crear el Usuario.",
      });
    });
};

// Obtener todos
exports.findAll = (req, res) => {
  Usuario.findAll(sinpassword)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los usuarios.",
      });
    });
};

// Buscar por id
exports.findOne = (req, res) => {
  const id = req.query.id;

  Usuario.findByPk(id, sinpassword)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Usuario with id=" + id + " " + err,
      });
    });
};

// Busqueda por nombre
exports.findByName = (req, res) => {
  const usuario = req.query.name;

  Usuario.findAll({
    where: { username: { [Op.like]: `%${usuario}%` } },
    sinpassword,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los usuarios.",
      });
    });
};

// Busqueda por departamento
exports.findByDep = (req, res) => {
  const departamento = req.query.departamento;
  Usuario.findAll({
    where: { departamentoId: { [Op.eq]: `${departamento}` } },
    sinpassword,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los usuarios.",
      });
    });
};

// Busqueda por rol
exports.findByRol = (req, res) => {
  const rol = req.query.rol;

  Usuario.findAll({
    where: { rol: { [Op.eq]: `${rol}` } },
    sinpassword,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los usuarios.",
      });
    });
};
//Borrar por id
exports.delete = (req, res) => {
  const id = req.query.id;
  Usuario.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuario borrado correctamente",
        });
      } else {
        res.send({
          message: `No se ha podido borrar con el id=${id}. `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se ha podido borrar con el id=" + id + " " + err,
      });
    });
};

// Actualizar por id
exports.update = (req, res) => {
  const id = req.query.id;
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }
  Usuario.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuario actualizado correctamente.",
        });
      } else {
        res.send({
          message: `No se puede actualizar usuario con id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se ha podido actualizar usuario con id=" + id + " " + err,
      });
    });
};
