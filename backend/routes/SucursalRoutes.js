const express = require("express");
const router = express.Router();

const sucursal_controller = require("../controllers/SucursalController");

router.post("/sucursal", sucursal_controller.sucursal_create);
router.put("/sucursal/:id", sucursal_controller.sucursal_delete);
router.get("/sucursal", sucursal_controller.sucursal_getall);
router.get("/sucursal/:id", sucursal_controller.sucursal_getById);

module.exports = router;
