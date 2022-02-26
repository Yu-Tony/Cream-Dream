const express = require('express');
const router =express.Router();

const cuenta_Controller=require("../controllers/CuentaController");

router.post("/cuenta",cuenta_Controller.cuenta_create);

module.exports = router;