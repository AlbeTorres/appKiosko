const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
  },
  apellido: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  movil: {
    type: Number,
  },
  advertencia: {
    type: Number,
  },
  carnet: {
    type: Number,
  },
  provincia: {
    type: String,
    trim: true,
  },
  municipio: {
    type: String,
    trim: true,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
  isAdmin: {
    type: Boolean,
  },
  perfilimg: {
    type: String,
  },
  perfil_cloud_id: {
    type: String,
  },
  kycimg: {
    type: String,
  },
  kyc: {
    type: Boolean,
  },
  kyc_cloud_id: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String,
  },
  recoveryCode: {
    type: Number,
  },
});

module.exports = mongoose.model("Usuario", UsuariosSchema);
