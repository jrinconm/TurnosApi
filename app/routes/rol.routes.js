module.exports = (app) => {
  const Rol = require("../controller/rol.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", Rol.create);

  // Read -- Obtener todos

  router.get("/", Rol.findAll);

  // Read -- Buscar por id
  router.get("/id", Rol.findOne);

  // Update -- Actualizar por id
  router.put("/id", Rol.update);

  // Delete -- Borrar por id
  router.delete("/id", Rol.delete);

  app.use("/api/rol", router);
};
