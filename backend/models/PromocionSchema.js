const mongoose = require("mongoose");

const PromocionSchema = new mongoose.Schema({
    Nombre:{
        type:String,
        required:true
    },
    Descripcion:{
        type:String,
        required:true
    },
    Porcentaje:{
        type:Number,
        required:true
    },
    Tiempo:{
        type:mongoose.Schema.Types.Date,
        required:true
    }
    
});

const Promocion = mongoose.model("promocion",PromocionSchema);
module.exports=Promocion;