const mongoose = require("mongoose");

const ComboSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  _comidas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comida",
    },
  ],
  precio: {
    type: Number,
    required: true,
  },
});

const Combo = mongoose.model("combo", ComboSchema);
module.exports = Combo;
