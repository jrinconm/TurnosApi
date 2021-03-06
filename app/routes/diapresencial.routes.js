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

  // Read -- Buscar por mes
  router.get("/mes", [authJwt.compruebatoken], diapresencial.findByMes);

  // Read -- Buscar por dia
  router.get("/dia", [authJwt.compruebatoken], diapresencial.findOne);

  // Read -- Busqueda por id de nombre
  router.get("/name", [authJwt.compruebatoken], diapresencial.findByName);

  // Read -- Busqueda por mes e id
  router.get(
    "/mesynombre",
    [authJwt.compruebatoken],
    diapresencial.findByNameyMes
  );

  // Read -- Busqueda por departamento
  router.get(
    "/departamento",
    [authJwt.compruebatoken],
    diapresencial.findByDep
  );
  // Read -- Obtener los dias que trabajan los del departamento de un usuario
  router.get(
    "/usuariodep",
    [authJwt.compruebatoken],
    diapresencial.findByUserDep
  );
  // Update -- Actualizar por id
  router.put("/id", [authJwt.compruebatoken], diapresencial.update);

  // Delete -- Borrar por id
  router.delete("/id", [authJwt.compruebatoken], diapresencial.delete);

  app.use("/api/diapresencial", router);
};
