module.exports = (app) => {
  const Rol = require("../controller/rol.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", Rol.create);

  // Read -- Obtener todos

  router.get("/", Rol.findAll);

  // Read -- Buscar por id
  router.get("/id", Rol.findOne);

  /*
  // Creo el skell basico
  // Update -- Actualizar por id
  router.put("/id", departamento.update);

  // Delete -- Borrar por id
  router.delete("/id", departamento.delete);
*/
  app.use("/api/rol", router);
};
