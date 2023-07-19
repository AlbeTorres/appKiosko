// rutas productos
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const shopCartController= require("../controllers/shopCartControllert")


router.get(
    "/",
    [
      check("cartproducts", "El array de cartproducts es obligatorio").not().isEmpty(),
    ],
    shopCartController.getCartPrice
  );

  module.exports = router;