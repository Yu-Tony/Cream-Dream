const express = require('express');
const router = express.Router();

const reservacion_controller = require('../controllers/ReservacionController');

router.post("/reservacion", reservacion_controller.reservacion_create);
router.delete("/reservacion/:id", reservacion_controller.reservacion_delete);
router.get("/reservacion/:id", reservacion_controller.reservacion_getById);
router.get("/reservacion?p='personas'&f='fecha'&h='hora'&s='sucursal'", reservacion_controller.reservacion_getByPeopleDateSucursal);

module.exports = router;
