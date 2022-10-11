const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true,
        trim: true
    },
    categoria:{
        type: String,
        trim: true
    },
    img:{
        type: String,
        required:true,
    },
    cloud_id:{
        type: String,
        required:true,
    },
    provincia:{
        type: String,
        trim: true
    },
    municipio:{
        type: String,
        trim: true
    },
    promodate:{
        type: String,
    },
    medida:{
        type: String,
    },
    precio:{
        type: Number,
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    registro:{
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Producto', ProductoSchema);