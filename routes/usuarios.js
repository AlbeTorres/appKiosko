//rutas de usuarios

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//Crea un usuario
//api/usuarios
router.post('/',
    [
        check('email','Agrega un email válido').not().isEmpty(),
        check('password', 'El password mínimo es de 6 caracteres').isLength({min:6})

    ],
    usuarioController.crearUsuario
);

//obtener todos los participantes
router.get('/',auth,
    usuarioController.obtenerUsuarios
    );

//modificar un usuario
router.patch('/:id',auth,
[
    check('nombre', 'El nombre es obligatorio ').not().isEmpty(),
    check('email',' un email válido').not().isEmpty(),
], 
    usuarioController.modificarUsuario
    );

//eliminar un usuario
router.delete('/:id',auth,
    usuarioController.eliminarUsuario
    );


module.exports= router;