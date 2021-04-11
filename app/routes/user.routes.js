module.exports = (app) => {
  const usuario = require("../controller/user.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", usuario.create);

  // Read -- Obtener todos

  router.get("/", usuario.findAll);

  // Read -- Buscar por id
  router.get("/id", usuario.findOne);

  // Read -- Busqueda por nombre
  router.get("/name", usuario.findByName);

  // Read -- Busqueda por nombre
  router.get("/dep", usuario.findByDep);

  // Read -- Busqueda por nombre
  router.get("/rol", usuario.findByRol);

  // Update -- Actualizar por id
  router.put("/:id", usuario.update);

  // Delete -- Borrar por id
  router.delete("/:id", usuario.delete);

  app.use("/api/user", router);
};
