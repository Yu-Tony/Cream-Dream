const mongoose = require("mongoose");

const PromocionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  porcentaje: {
    type: Number,
    required: true,
  },
  tiempo: {
    //YYYY-MM-DD
    type: mongoose.Schema.Types.Date,
    required: true,
  },
});

const Promocion = mongoose.model("promocion", PromocionSchema);
module.exports = Promocion;
