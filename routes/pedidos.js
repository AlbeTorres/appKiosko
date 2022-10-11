// rutas trabajos
const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//crear un trabajo
//api/trabajos
router.post('/',auth,
    [
        check('productos','No puede estar vacio').not().isEmpty(),
        check('usuario','El usuario no puede estar vacio').not().isEmpty()
    ],
    pedidosController.crearPedido
);

//obtener todos los trabajos
router.get('/',auth,
    pedidosController.obtenerPedidos
    );
    
//modificar un trabajo
router.patch('/:id',auth,
    pedidosController.modificarPedido
);

//eliminar un trabajo
router.delete('/:id',auth,
    pedidosController.eliminarPedido
);

module.exports= router;