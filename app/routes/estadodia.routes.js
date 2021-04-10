module.exports = (app) => {
  const estadodia = require("../controller/estadodia.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", estadodia.create);

  // Read -- Obtener todos

  router.get("/", estadodia.findAll);

  // Read -- Buscar por id
  router.get("/:id", estadodia.findOne);

  /*
  // Creo el skell basico
  // Update -- Actualizar por id
  router.put("/:id", departamento.update);

  // Delete -- Borrar por id
  router.delete("/:id", departamento.delete);
*/
  app.use("/api/estadodia", router);
};
