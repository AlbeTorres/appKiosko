const OrderCounter = require("../models/OrderCounter");

const initializeCounter = async () => {
  try {
    const counter = await OrderCounter.findOne({ id: "orderNumber" });

    // Si el contador no existe, inicialízalo
    if (!counter) {
      await OrderCounter.create({ id: "orderNumber", order: 10 });
      console.log("Counter initialized successfully");
    }
  } catch (error) {
    console.error("Error initializing counter:", error);
    process.exit(1);
  }
};

module.exports = { initializeCounter };
