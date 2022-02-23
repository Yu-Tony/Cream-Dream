const express = require("express");
const router = express.Router();

const mesa_controller = require("../controllers/MesaController");

router.post("/mesa", mesa_controller.mesa_create);
router.put("/mesa/:id", mesa_controller.mesa_update);
router.get("/mesa", mesa_controller.mesa_availables);
