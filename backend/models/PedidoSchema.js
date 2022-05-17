const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  comidas: [
    {
      comida: { type: mongoose.Types.ObjectId, ref: "comida" },
      cantidad: { type: Number },
      opcion: { type: String },
      ordenado: { type: Boolean },
    },
  ],
  combos: [
    {
      combo: { type: mongoose.Types.ObjectId, ref: "combo" },
      cantidad: { type: Number },
      ordenado: { type: Boolean },
    },
  ],
  mesa: {
    type: mongoose.Types.ObjectId,
    ref: "mesa",
    required: true,
  },
  cliente: {
    type: mongoose.Types.ObjectId,
    ref: "cliente",
    requires: true,
  },
});

const Pedido = mongoose.model("pedido", PedidoSchema);
module.exports = Pedido;
