module.exports = (app) => {
  const diapresencial = require("../controller/diapresencial.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", diapresencial.create);

  // Read -- Obtener todos

  router.get("/", diapresencial.findAll);

  // Read -- Buscar por dia
  router.get("/dia", diapresencial.findOne);

  // Read -- Busqueda por nombre
  router.get("/name", diapresencial.findByName);

  // Update -- Actualizar por id
  router.put("/id", diapresencial.update);

  // Delete -- Borrar por id
  router.delete("/id", diapresencial.delete);

  app.use("/api/diapresencial", router);
};
