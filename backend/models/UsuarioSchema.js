const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
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
  /* 0 - Cliente, 1 - Empleado, 2 - Admin */
  tipo: {
    type: Number,
    require: true,
  },
  _sucursal: {
    type: mongoose.Schema.Types.ObjectId,
  },
  baja: {
    type: Boolean,
    default: 0,
  },
});

const Usuario = mongoose.model("usuario", UsuarioSchema);
module.exports = Usuario;
