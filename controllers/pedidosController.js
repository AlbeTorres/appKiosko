const Pedido = require("../models/Pedido");
const { validationResult } = require("express-validator");
const { sendPedidoEmail } = require("../utils/sendPedidoMail");
const Usuario = require("../models/Usuario");
const product = require("../utils/ProductUtils");
const OrderCounter = require("../models/OrderCounter");

// Función para obtener y actualizar el número de pedido único
const getNextOrderNumber = async () => {
  const counter = await OrderCounter.findOneAndUpdate(
    { id: "orderNumber" },
    { $inc: { order: 1 } },
    { new: true }
  );

  return counter.sequenceValue;
};

const obtenerCliente = async (id) => {
  let usuario = await Usuario.findOne({ _id: id });

  return usuario;
};

const mapearPedidos = async (pedido) => {
  const productlist = JSON.parse(pedido.productos);
  let products = [];
  let i = 0;

  while (i < productlist.length) {
    let aux = await product.getProduct(productlist[i]._id);

    products.push({ ...aux._doc, cantidad: productlist[i].cantidad });

    i = i + 1;
  }
  return products;
};

exports.crearPedido = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    // Obtener el próximo número de pedido del contador y actualizarlo
    const orderNumber = await getNextOrderNumber();

    //crear trabajo
    const pedido = new Pedido({ ...req.body, order: orderNumber });
    pedido.usuario = req.usuario.id;

    const usuario = await Usuario.findOne({ _id: req.usuario.id });

    await pedido.save();

    sendPedidoEmail(usuario, "albertocorreoficial@gmail.com", pedido);

    res.status(200).json(pedido);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

//obtener todos los pedidos
exports.obtenerPedidos = async (req, res) => {
  try {
    const usuario = req.usuario;
    console.log(usuario);
    const pedidos = await Pedido.find({ usuario: usuario.id });
    res.status(200).json(pedidos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

// exports.obtenerPedidosAdmin = async (req, res) => {
//   try {
//     const usuario = req.usuario;
//     console.log(usuario);
//     const pedidos = await Pedido.find();
//     res.status(200).json(pedidos);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Hubo un error" });
//   }
// };

//obtener pedido
exports.obtenerPedido = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    const pedido = await Pedido.findOne({ _id: req.params.id });

    const products = await mapearPedidos(pedido);

    const cliente = await obtenerCliente(pedido.usuario);

    res
      .status(200)
      .json({ ...pedido._doc, productos: products, cliente: cliente });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.modificarPedido = async (req, res) => {
  try {
    //verificar que el trabajo existe
    const pedidoFind = await Pedido.findById(req.params.id);
    if (!pedidoFind) {
      return res.status(404).json({ msg: "No existe el pedido a modificar" });
    }

    //actualizar trabajo
    await Pedido.updateOne({ _id: req.params.id }, { $set: req.body });

    const resolve = await Pedido.findById(req.params.id);
    res.status(200).json(resolve);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
exports.eliminarPedido = async (req, res) => {
  try {
    //verificar que el trabajo existe
    const pedidoFind = await Pedido.findById(req.params.id);
    if (!pedidoFind) {
      return res.status(404).json({ msg: "No existe el pedido a modificar" });
    }

    //eliminar trabajo
    await Pedido.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: "Pedido eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
