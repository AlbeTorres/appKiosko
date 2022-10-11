const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    movil:{
        type: Number,
        unique: true
    },
    provincia:{
        type: String,
        trim: true
    },
    municipio:{
        type: String,
        trim: true
    },
    registro:{
        type: Date,
        default: Date.now()

    },
    isAdmin:{
        type: Boolean
    },
    carnet:{
        type: String,
        trim: true
    },
    kyc:{
        type:Boolean,
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);