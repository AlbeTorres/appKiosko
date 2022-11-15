const express = require('express');
const http = require('http');
const conectarDB = require('./config/db')
const cors = require('cors')

// crear eL servidor express
const app = express();

//crear el server http para socket
const server = http.createServer(app)

//conectar la base de datos
conectarDB();

//habilitar cors
app.use(cors());

//Habilitar Express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/productos', require('./routes/productos'))
app.use('/api/banners', require('./routes/banners'))
app.use('/api/pedidos', require('./routes/pedidos'))



// arrancar la app
server.listen(PORT, ()=>{
    console.log(`El servidor está corriendo en el puerto ${PORT}`)
}); 