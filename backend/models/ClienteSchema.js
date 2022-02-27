const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
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
  },
  contrasena: {
    type: String,
    required: true,
  },
});

const Cliente = mongoose.model("cliente", clienteSchema);
module.exports = Cliente;
