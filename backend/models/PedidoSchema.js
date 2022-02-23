const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    Comida: 
    [
        { 
            type: mongoose.Types.ObjectId, ref: 'comida'
          
        }
    ],
    Combo:
    [
        { 
            type: mongoose.Types.ObjectId, ref: 'combo' 
        }
    ],
    Mesa:
    {
        type: mongoose.Types.ObjectId, ref: 'mesa', 
        required: true
    }, 
    Subtotal:
    {
        type: Number,
        required: true
    }
});

const Pedido = mongoose.model("pedido", PedidoSchema);
module.exports = Pedido;