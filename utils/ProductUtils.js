const Producto = require("../models/Producto");

exports.getProductPrice = async (id) => {
  const product = await Producto.findById(id);

  return product.precio;
};

exports.getProduct = async (id) => {
  const product = await Producto.findById(id);

  return product;
};
