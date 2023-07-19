const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

const getProductPrice = async (id) => {
  const product = await Producto.findById(id);

  return product.precio;
};

exports.getCartPrice = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const cartproducts = JSON.parse(req.query.cartproducts);

    let totalCartPrice = 0;
    totalCartPrice = await cartproducts.reduce(async (totalCartPrice, p) => {
      let aux = await getProductPrice(p._id);

      return (totalCartPrice + aux) * p.cantidad;
    }, 0);

    res.status(200).json({ totalCartPrice });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
