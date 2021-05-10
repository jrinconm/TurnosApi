const { authJwt } = require("../middle");
module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const diapresencial = require("../controller/diapresencial.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", [authJwt.compruebatoken], diapresencial.create);

  // Read -- Obtener todos

  router.get("/", [authJwt.compruebatoken], diapresencial.findAll);

  // Read -- Buscar por dia
  router.get("/dia", [authJwt.compruebatoken], diapresencial.findOne);

  // Read -- Busqueda por nombre
  router.get("/name", [authJwt.compruebatoken], diapresencial.findByName);

  // Read -- Busqueda por nombre
  router.get(
    "/departamento",
    [authJwt.compruebatoken],
    diapresencial.findByDep
  );

  // Update -- Actualizar por id
  router.put("/id", [authJwt.compruebatoken], diapresencial.update);

  // Delete -- Borrar por id
  router.delete("/id", [authJwt.compruebatoken], diapresencial.delete);

  app.use("/api/diapresencial", router);
};
