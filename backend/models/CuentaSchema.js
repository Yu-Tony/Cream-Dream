const mongoose = require("mongoose");

const CuentaSchema = new mongoose.Schema({
    Pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pedido"
    },
    Total:{
        type: mongoose.Schema.Types.Decimal128,
        required:true   
    },
    Propina:{
        type:mongoose.Schema.Types.Decimal128
    },
    Metodo:{
        type:String,
        required:true
    },
    Cliente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cliente"
    }
});

const Cuenta = mongoose.model("cuenta",CuentaSchema);
module.exports=Cuenta;