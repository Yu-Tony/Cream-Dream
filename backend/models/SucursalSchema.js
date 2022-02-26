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
  telefono: {
    type: String,
  },
  imagen: [
    {
      data: Buffer,
      contentType: String,
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
