const express = require("express");
const router = express.Router();

const comida_controller = require("../controllers/ComidaController");

router.get("/comidas-menu", comida_controller.comida_getall_menu);
router.get("/comida/:id", comida_controller.comida_getById);
router.get("/comida", comida_controller.comida_getByQuery);
router.post("/comida", comida_controller.comida_create);
router.put("/comida/:id", comida_controller.comida_update);
router.post("/comida/image", comida_controller.comida_image);

module.exports = router;
