const mongoose = require('mongoose');

const PedidoSchema = mongoose.Schema({

    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Usuario'
    },
    productos:{
        type: Array,
        required: true,
    },
    estado:{
        type: String,
        required: true,
    },
    direccion:{
        type: String,
        required: true,
    },
    receptor:{
        type: String,
        required: true,
    },
    movil:{
        type: String,
        required: true,
    },
    pago:{
        type: String,
        required: true,
    },
    valor:{
        type: Number,
        required: true,
    },
    fechaini:{
        type: Date,
        default: Date.now()
    },
    fechafin:{
        type:Date
    }

});

module.exports = mongoose.model('Pedido', PedidoSchema);