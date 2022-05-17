const mongoose = require("mongoose");

const SucursalSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  direccion_corta: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
  },
  imagenes: [
    {
      type: String,
      require: true,
    },
  ],
  calificacion: [
    {
      type: Object,
    },
  ],
  baja: {
    type: Boolean,
    default: 0,
  },
});

const Sucursal = mongoose.model("sucursal", SucursalSchema);
module.exports = Sucursal;
