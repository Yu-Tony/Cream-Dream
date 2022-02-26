const express = require("express");
const router = express.Router();

const resena_controller = require("../controllers/ResenaController");

router.post("/resena", resena_controller.resena_create);
router.delete("/resena/:id", resena_controller.resena_delete);
router.get("/resena/:id", resena_controller.resena_getByIdAndType);

module.exports = router;
