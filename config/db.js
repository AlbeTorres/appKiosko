const mongoose = require("mongoose");
const { initializeCounter } = require("./populate");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);

    console.log("Database Conectada");

    // Inicializa el contador (si no se ha inicializado previamente)
    await initializeCounter();
  } catch (error) {
    console.log(error);
    process.exit(1); // detener la app si hay problemas de conexión
  }
};

module.exports = conectarDB;
