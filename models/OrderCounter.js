const mongoose = require("mongoose");

const OrderCounterSchema = mongoose.Schema({
  order: {
    type: Number,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("OrderCounter", OrderCounterSchema);
