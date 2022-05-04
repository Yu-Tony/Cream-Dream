const mongoose = require("mongoose");

const CuentaSchema = new mongoose.Schema({
  _pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pedido",
  },
  total: {
    type: Number,
    required: true,
  },
  propina: {
    type: Number,
  },
  metodo: {
    type: String,
    required: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cliente",
  },
});

const Cuenta = mongoose.model("cuenta", CuentaSchema);
module.exports = Cuenta;
