const express = require('express');
const router = express.Router();

const promo_controller = require('../controllers/PromocionController');

router.get("/promo",promo_controller.promo_getall);
router.post("/promo",promo_controller.promo_create);
router.delete("/promo/:id",promo_controller.promo_delete);

module.exports = router;

