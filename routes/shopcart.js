// rutas productos
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const shopCartController = require("../controllers/shopCartControllert");

router.get(
  "/",
  [
    check("cartproducts", "El array de cartproducts es obligatorio")
      .not()
      .isEmpty(),
  ],
  shopCartController.getCartPrice
);
router.get(
  "/deliverycost",
  [
    check("provincia", "La provincia es obligatoria").not().isEmpty(),
    check("municipio", "El municipio es obligatorio").not().isEmpty(),
  ],
  shopCartController.getDeliveryCost
);

router.get(
  "/products",
  [
    check("cartproducts", "El array de cartproducts es obligatorio")
      .not()
      .isEmpty(),
  ],
  shopCartController.getCartProducts
);

router.post(
  "/deliverycost",
  auth,
  [
    check("provincia", "La provincia es obligatoria").not().isEmpty(),
    check("municipio", "El municipio es obligatorio").not().isEmpty(),
    check("tienda", "El municipio es obligatorio").not().isEmpty(),
    check("valor_envio", "El municipio es obligatorio").not().isEmpty(),
  ],
  shopCartController.addDeliveryCost
);

module.exports = router;
