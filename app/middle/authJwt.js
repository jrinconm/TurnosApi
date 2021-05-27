const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Usuario = db.Usuario;
// Compruebo si hay token y es bueno
let compruebatoken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Necesario autenticar primero",
    });
  }
  // Compruebo si el token es bueno
  // Seguramente le ponga un timeout de 1 dia
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No autorizado!",
      });
    }
    // Extraigo el id de usuario
    req.userId = decoded.id;
    next();
  });
};
// Compruebo el nivel de acceso
// Admin
let isAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then((user) => {
    // De momento lo imprimo
    console.log(user, res, next);
  });
};
let isSuper = (req, res, next) => {
  console.log("Compruebo si es admin");
  Usuario.findByPk(req.userId).then((user) => {
    // De momento lo imprimo
    console.log(user, res, next);
  });
};
const authJwt = {
  compruebatoken: compruebatoken,
  isAdmin: isAdmin,
  isSuper: isSuper,
};
module.exports = authJwt;
