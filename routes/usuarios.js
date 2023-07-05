//rutas de usuarios

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//Crea un usuario
//api/usuarios
router.post(
  "/",
  [
    check("email", "Agrega un email válido").not().isEmpty(),
    check("password", "El password mínimo es de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  usuarioController.crearUsuario
);

//obtener todos los participantes
router.get("/", auth, usuarioController.obtenerUsuarios);

//modificar un usuario
router.patch("/:id", auth, usuarioController.modificarUsuario);

//eliminar un usuario
router.delete("/:id", auth, usuarioController.eliminarUsuario);

//verificar email
router.post(
  "/verify-email",
  auth,
  [check("emailToken", "Debe enviar un token").not().isEmpty()],
  usuarioController.verificarEmail
);
//verificar email
router.post(
  "/recovery-code",
  [check("email", "Debe enviar un email").not().isEmpty()],
  usuarioController.recoveryCode
);
//cambiar password
router.post(
  "/change-password",
  [
    [check("email", "Debe enviar un email").not().isEmpty()],
    check("password", "Debe enviar el nuevo password").not().isEmpty(),
    check("code", "Debe enviar el code").not().isEmpty(),
  ],
  usuarioController.changePassword
);

module.exports = router;
