const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

const getProductPrice = async (id) => {
  const product = await Producto.findById(id);

  return product.precio;
};

const getProduct = async (id) => {
  const product = await Producto.findById(id);

  return product;
};

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
      let aux = await getProductPrice(cartproducts[i]._id);

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
      let aux = await getProduct(cartproductsid[i]._id);

      cartproducts.push(aux);

      i = i + 1;
    }

    console.log(cartproducts);

    res.status(200).json({ cartproducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
