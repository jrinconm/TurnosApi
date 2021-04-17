const { authJwt } = require("../middle");
module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const departamento = require("../controller/departamento.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", [authJwt.compruebatoken], departamento.create);

  // Read -- Obtener todos
  router.get("/", [authJwt.compruebatoken], departamento.findAll);

  // Read -- Busqueda por nombre
  router.get("/name", [authJwt.compruebatoken], departamento.findByName);

  // Read -- Buscar por id
  router.get("/id", [authJwt.compruebatoken], departamento.findOne);

  // Update -- Actualizar por id
  router.put("/id", [authJwt.compruebatoken], departamento.update);

  // Delete -- Borrar por id
  router.delete("/id", [authJwt.compruebatoken], departamento.delete);

  app.use("/api/departamento", router);
};
