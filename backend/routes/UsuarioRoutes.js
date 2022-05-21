const express = require("express");
const router = express.Router();

const usuario_controller = require("../controllers/UsuarioController");

router.post("/usuario", usuario_controller.usuario_signin);
router.post("/usuario/validacion", usuario_controller.usuario_login);
router.put("/usuario/:id", usuario_controller.usuario_update);
router.delete("/usuario/:id", usuario_controller.usuario_delete);
router.get("/usuario/:id", usuario_controller.usuario_getById);
router.get("/empleado", usuario_controller.usuario_getBySucursal);

module.exports = router;
