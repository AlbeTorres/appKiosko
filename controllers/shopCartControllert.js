const CostoEnvío = require("../models/CostoEnvío");
const { validationResult } = require("express-validator");
const product = require("../utils/ProductUtils");

exports.getCartPrice = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const cartproducts = JSON.parse(req.query.cartproducts);

    let totalCartPrice = 0;
    let i = 0;

    while (i < cartproducts.length) {
      let aux = await product.getProductPrice(cartproducts[i]._id);

      totalCartPrice = (totalCartPrice + aux) * cartproducts[i].cantidad;

      i = i + 1;
    }

    res.status(200).json({ totalCartPrice });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.getCartProducts = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const cartproductsid = JSON.parse(req.query.cartproducts);

    let cartproducts = [];
    let i = 0;

    while (i < cartproductsid.length) {
      let aux = await product.getProduct(cartproductsid[i]._id);

      cartproducts.push(aux);

      i = i + 1;
    }

    res.status(200).json({ cartproducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.getDeliveryCost = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { provincia, municipio } = req.query;

    if (!provincia || !municipio) {
      res.status(400).json({ msg: "bad request" });
    }

    const deliverycost = await CostoEnvío.findOne({ municipio, provincia });

    if (deliverycost) {
      res.status(200).json({ valor_envio: deliverycost.valor_envio });
    } else {
      res.status(404).json({ msg: "delivery cost not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.addDeliveryCost = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { provincia, municipio, tienda, valor_envio } = req.body;

    if (!provincia || !municipio || !tienda || !valor_envio) {
      res.status(400).json({ msg: "bad request" });
    }

    const deliverycost = new CostoEnvío(req.body);
    await deliverycost.save();

    res.status(200).json({ deliverycost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
