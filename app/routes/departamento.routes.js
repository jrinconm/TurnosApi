module.exports = (app) => {
  const departamento = require("../controller/departamento.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", departamento.create);

  // Read -- Obtener todos
  router.get("/", departamento.findAll);

  // Read -- Buscar por id
  router.get("/id", departamento.findOne);

  // Delete -- Borrar por id
  router.delete("/id", departamento.delete);

  // Read -- Busqueda por nombre
  router.get("/name", departamento.findByName);

  /*
  // Creo el skell basico
  // Update -- Actualizar por id
  router.put("/id", departamento.update);


*/
  app.use("/api/departamento", router);
};
