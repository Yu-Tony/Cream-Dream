const express = require("express");
const router = express.Router();

const pedido_controller = require("../controllers/PedidoController");

router.put("/pedido/:id", pedido_controller.pedido_update);

module.exports = router;
