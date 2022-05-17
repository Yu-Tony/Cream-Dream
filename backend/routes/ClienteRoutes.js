const express = require("express");
const router = express.Router();

const cliente_controller = require("../controllers/ClienteController");

router.post("/cliente", cliente_controller.cliente_signin);
router.post("/cliente/validacion", cliente_controller.cliente_login);
router.put("/cliente/:id", cliente_controller.cliente_update);
router.delete("/cliente/:id", cliente_controller.cliente_delete);
router.get("/cliente/:id", cliente_controller.cliente_getById);

module.exports = router;
