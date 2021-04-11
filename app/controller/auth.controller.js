const db = require("../models");
const config = require("../config/auth.config");
const Usuario = db.Usuario;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  Usuario.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      var compruebaPass = bcrypt.compareSync(req.body.pass, user.password);

      if (!compruebaPass) {
        return res.status(401).send({
          accessToken: null,
          message: "Contraseña no valida",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        rol: user.rol,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
