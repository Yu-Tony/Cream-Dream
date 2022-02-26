const express = require("express");
const router = express.Router();

const empleado_Controller = require("../controllers/EmpleadoController");

router.post("/empleado/validacion", empleado_Controller.empleado_login);
router.post("/empleado", empleado_Controller.empleado_create);
router.put("/empleado/:id", empleado_Controller.empleado_update);
router.get("/empleado/:id", empleado_Controller.empleado_getById);
router.get("/empleado", empleado_Controller.empleado_getBySucursal);

module.exports = router;
