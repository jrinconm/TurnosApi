const { authJwt } = require("../middle");
module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const estadodia = require("../controller/estadodia.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", [authJwt.compruebatoken], estadodia.create);

  // Read -- Obtener todos

  router.get("/", [authJwt.compruebatoken], estadodia.findAll);

  // Read -- Buscar por id
  router.get("/id", [authJwt.compruebatoken], estadodia.findOne);

  // Update -- Actualizar por id
  router.put("/id", [authJwt.compruebatoken], estadodia.update);

  // Delete -- Borrar por id
  router.delete("/id", [authJwt.compruebatoken], estadodia.delete);

  app.use("/api/estadodia", router);
};
