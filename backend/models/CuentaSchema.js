const mongoose = require("mongoose");

const CuentaSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pedido",
  },
  total: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  propina: {
    type: mongoose.Schema.Types.Decimal128,
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
