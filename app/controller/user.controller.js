const db = require("../models");
const Usuario = db.Usuario;
// Operadores de Sequelize para condiciones
const Op = db.Sequelize.Op;

// Crear Usuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Es necesario el nombre de usuario!",
    });
    console.log(req.body);
    return;
  } else if (!req.body.email) {
    res.status(400).send({
      message: "Es necesario el correo electronico!",
    });
    console.log(req.body);
    return;
  } else if (!req.body.departamento) {
    res.status(400).send({
      message: "Es necesario nidicar el departamento!",
    });
    console.log(req.body);
    return;
  }
  // Si no hay rol lo pongo como 1
  let rol = req.body.rol ? req.body.rol : "1";

  // Si no hay password lo pongo como null
  let pass = req.body.pass ? req.body.pass : null;

  // Creo el objeto del cuerpo de la peticion
  const usuario = {
    username: req.body.dia,
    email: req.body.usuario,
    password: pass,
    rolIdRol: rol,
    departamentoIdDepartamento: req.body.departamento,
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
  Usuario.findAll()
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
  const id_usuario = req.params.id;

  Usuario.findByPk(id_usuario)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Usuario with id=" + id_usuario + " " + err,
      });
    });
};

// Busqueda por nombre
exports.findByName = (req, res) => {
  const usuario = req.query.name;

  Usuario.findAll({
    where: { username: { [Op.like]: `%${usuario}%` } },
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
  const departamento = req.query.dep;

  Usuario.findAll({
    where: { departamentoIdDepartamento: { [Op.eq]: `${departamento}` } },
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
    where: { rolIdRol: { [Op.eq]: `${rol}` } },
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
/*
// Creo el skell basico
// Actualizar por id
exports.update = (req, res) => {};

//Borrar por id
exports.delete = (req, res) => {};
*/
