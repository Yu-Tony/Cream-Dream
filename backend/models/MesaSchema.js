const mongoose = require("mongoose");

const mesaSchema = new mongoose.Schema({
  sillas: {
    type: Number,
    required: true,
    default: 0,
  },
  disponible: {
    type: Boolean,
    required: true,
    default: true,
  },
  _empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "empleado",
  },
  _sucursal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sucursal",
  },
});

const Mesa = mongoose.model("mesa", mesaSchema);
module.exports = Mesa;
