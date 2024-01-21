const mongoose = require("mongoose");

const PedidoSchema = mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  productos: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    unique: true,
  },
  estado: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  municipio: {
    type: String,
    required: true,
  },
  receptor: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  carnet: {
    type: Number,
    required: true,
  },
  movil: {
    type: String,
    required: true,
  },
  metodo_pago: {
    type: String,
    required: true,
  },
  valor_total: {
    type: Number,
    required: true,
  },
  valor_subtotal: {
    type: Number,
    required: true,
  },
  valor_descuentos: {
    type: Number,
    required: true,
  },
  valor_envio: {
    type: Number,
    required: true,
  },
  fechaini: {
    type: Date,
    default: Date.now(),
  },
  fechafin: {
    type: Date,
  },
});

module.exports = mongoose.model("Pedido", PedidoSchema);
