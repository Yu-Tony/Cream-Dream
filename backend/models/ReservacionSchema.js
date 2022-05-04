const mongoose = require("mongoose");

const ReservacionSchema = new mongoose.Schema({
  _mesa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mesa",
  },
  fecha: {
    type: mongoose.Schema.Types.Date,
  },
  no_personas: {
    type: Number,
  },
});

const Reservacion = mongoose.model("reservacion", ReservacionSchema);
module.exports = Reservacion;
