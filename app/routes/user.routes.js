const { authJwt } = require("../middle");
module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const usuario = require("../controller/user.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", [authJwt.compruebatoken], usuario.create);

  // Read -- Obtener todos

  router.get("/", [authJwt.compruebatoken], usuario.findAll);

  // Read -- Buscar por id
  router.get("/id", [authJwt.compruebatoken], usuario.findOne);

  // Read -- Busqueda por nombre
  router.get("/name", [authJwt.compruebatoken], usuario.findByName);

  // Read -- Busqueda por nombre
  router.get("/dep", [authJwt.compruebatoken], usuario.findByDep);

  // Read -- Busqueda por nombre
  router.get("/rol", [authJwt.compruebatoken], usuario.findByRol);

  // Update -- Actualizar por id
  router.put("/:id", [authJwt.compruebatoken], usuario.update);

  // Delete -- Borrar por id
  router.delete("/:id", [authJwt.compruebatoken], usuario.delete);

  app.use("/api/user", router);
};
