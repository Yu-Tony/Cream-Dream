const mongoose = require("mongoose");

const EmpleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  sucursal: {
    type: mongoose.Schema.Types.ObjectId,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  baja: {
    type: Boolean,
    default: 0,
  },
  admin: {
    type: Boolean,
    default: 0,
  },
});

const Empleado = mongoose.model("empleado", EmpleadoSchema);
module.exports = Empleado;
