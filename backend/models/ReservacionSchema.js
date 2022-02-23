const mongoose = require('mongoose');

const ReservacionSchema = new mongoose.Schema({
    mesa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mesa"
    },
    fecha:{
        type: Date
    },
    hora:{
        type: Date
    },
    no_Personas:{
        type: Number
    }
})


const Reservacion = mongoose.model("reservacion", ReservacionSchema);
module.exports = Reservacion;