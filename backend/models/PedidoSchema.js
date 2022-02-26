const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  comidas: [
    {
      type: mongoose.Types.ObjectId,
      ref: "comida",
    },
  ],
  combos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "combo",
    },
  ],
  mesa: {
    type: mongoose.Types.ObjectId,
    ref: "mesa",
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

const Pedido = mongoose.model("pedido", PedidoSchema);
module.exports = Pedido;
