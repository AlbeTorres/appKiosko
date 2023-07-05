const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationMail } = require("../utils/sendVerificationMail");
const { sendRecoveryPassEmail } = require("../utils/sendRecoveryPassEmail");

exports.crearUsuario = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //crea el usuario

    usuario = new Usuario({
      ...req.body,
      emailToken: crypto.randomBytes(64).toString("hex"),
    });

    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await usuario.save();

    //enviar mail de verificacion
    sendVerificationMail(usuario);

    //crear y firmar jwt
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //firmar el jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmacion
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Hubo un Error" });
  }
};

exports.modificarUsuario = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //verificar que el trabajo existe
    const usuarioFind = Usuario.find(req.params.id);
    if (!usuarioFind) {
      return res.status(404).json({ msg: "No existe el usuario a modificar" });
    }

    //actualizar usuario
    await Usuario.updateOne({ _id: req.params.id }, { $set: req.body });
    const usuario = await Usuario.findById(req.params.id);
    res.status(200).json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //verificar que el usuario existe
    const usuarios = await Usuario.find({});

    //retornar usuario
    res.status(200).json({ usuarios });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    //verificar que el trabajo existe
    const usuarioFind = Usuario.find(req.params.id);
    if (!usuarioFind) {
      return res.status(404).json({ msg: "No existe el usuario a eliminar" });
    }

    //eliminar usuario
    await Usuario.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.verificarEmail = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const emailToken = req.body.emailToken;

    if (!emailToken) {
      return res.status(404).json("emailToken not found...");
    }

    const usuario = await Usuario.findOne({ emailToken });

    if (usuario) {
      usuario.emailToken = null;
      usuario.isVerified = true;

      await usuario.save();

      res.status(200).json(usuario);
    } else {
      res.status(404).json("Email verification failed, invalid token");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

exports.recoveryCode = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const email = req.body.email;

    if (!email) {
      return res.status(404).json("email not found...");
    }

    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      const recoveryCode = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 10)
      );
      usuario.recoveryCode = recoveryCode.toString().replaceAll(",", "");

      await usuario.save();

      sendRecoveryPassEmail(usuario);

      res.status(200).json("Recovery code sended");
    } else {
      res.status(404).json("Email recovery code failed, invalid email");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

exports.changePassword = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { password, code } = req.body.id;

    const usuario = await Usuario.findOne({ _id: req.params.id });

    if (usuario) {
      if (usuario.recoveryCode === code) {
        //hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        res.status(200).json("Password changed");
      } else {
        res.status(404).json("Invalid code");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
