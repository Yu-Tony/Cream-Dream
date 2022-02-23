const mongoose = require('mongoose');

const ComboSchema = new mongoose.Schema({
    nombre:
    {
        Type: String,
        required: true
    },
    descripcion: 
    {
        Type: String,
        required: true
    },
    comida: 
    [
        { 
            type: mongoose.Types.ObjectId, ref: 'comida'
          
        }
    ],
    precio:
    {
        type: Number,
        required: true
    }
});

const Combo = mongoose.model("combo", ComboSchema);
module.exports = Combo;