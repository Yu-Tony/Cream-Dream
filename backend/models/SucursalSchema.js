const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
    nombre:
    {
        Type: String,
        required: true
    },
    direccion: 
    {
        Type: String,
        required: true
    },
    telefono:
    {
        Type: String
    },
    imagen:
    [ 
        {
            data: Buffer,
            contentType: String
        }
    ],
    calificacion:
    [
        {
            Type: Object
        }
    ], 
    baja:
    {
        Type: Boolean,
        default: 0
    }
});

const Sucursal = mongoose.model("sucursal", SucursalSchema);
module.exports = Sucursal;