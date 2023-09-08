const mongoose = require("mongoose");

const CostoEnvioSchema = mongoose.Schema({
  tienda: {
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
module.exports = mongoose.model("CostoEnvio", CostoEnvioSchema);
