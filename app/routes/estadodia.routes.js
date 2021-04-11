module.exports = (app) => {
  const estadodia = require("../controller/estadodia.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", estadodia.create);

  // Read -- Obtener todos

  router.get("/", estadodia.findAll);

  // Read -- Buscar por id
  router.get("/id", estadodia.findOne);

  // Update -- Actualizar por id
  router.put("/id", estadodia.update);

  // Delete -- Borrar por id
  router.delete("/id", estadodia.delete);

  app.use("/api/estadodia", router);
};
