const express = require('express');
const router = express.Router();

const combo_controller = require("../controllers/ComboController");

router.post("/combo", combo_controller.combo_create);
router.put("/combo/:id", combo_controller.combo_update);
router.delete("/combo/:id", combo_controller.combo_delete);
router.get("/combo", combo_controller.combo_getall);
router.get("/combo/:id", combo_controller.combo_getById);
router.get("/combo?n='query'", combo_controller.combo_getByName);


module.exports=router;