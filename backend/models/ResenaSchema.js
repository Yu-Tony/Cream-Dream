const mongoose = require('mongoose');

const ResenaSchema = new mongoose.Schema ({
    calificacion:{
        type: Number
    },
    descripcion: {
        type: String
    },
    tipo:{
        type: Boolean
    },
    idTipo:{
        type: mongoose.Schema.Types.ObjectId
    }
})


const Resena = mongoose.model("resena", ResenaSchema);
module.exports = Resena;
