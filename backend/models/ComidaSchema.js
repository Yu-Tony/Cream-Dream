const mongoose = require("mongoose");

const comidaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    default: 0,
    required: true,
  },
  precio: {
    type: Object,
    required: true,
  },
  categoria: [
    {
      type: String,
      required: true,
    },
  ],
  baja: {
    type: Boolean,
    required: true,
  },
  _promocion: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Comida = mongoose.model("comida", comidaSchema);
module.exports = Comida;