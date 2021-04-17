const { authJwt } = require("../middle");
module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const Rol = require("../controller/rol.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", [authJwt.compruebatoken], Rol.create);

  // Read -- Obtener todos

  router.get("/", [authJwt.compruebatoken], Rol.findAll);

  // Read -- Buscar por id
  router.get("/id", [authJwt.compruebatoken], Rol.findOne);

  // Update -- Actualizar por id
  router.put("/id", [authJwt.compruebatoken], Rol.update);

  // Delete -- Borrar por id
  router.delete("/id", [authJwt.compruebatoken], Rol.delete);

  app.use("/api/rol", router);
};
