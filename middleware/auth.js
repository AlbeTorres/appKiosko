const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //leer el token del head
    const token = req.header('x-auth-token');
    const tokenObject = JSON.parse(token, 'base64');

    //revisar si no hay token
    if(!token){
        return res.status(401).json({msg:'No hay token, permiso no válido'});
    }
    //validar el token
    try {

        const cifrado = jwt.verify(tokenObject,process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({msg:'token no válido'});
    }
}