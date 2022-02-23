const mongoose = require("mongoose");

const EmpleadoSchema = new mongoose.Schema({
    Nombre:{
        type:String,
        required:true
    },
    Apellido:{
        type:String,
        required:true
    },
    Calificacion:{
        type:[mongoose.Schema.Types.ObjectId]
    },
    Sucursal:{
        type:mongoose.Schema.Types.ObjectId
    },
    Correo:{
        type:String,
        required:true,
        unique:true
    },
    Contraseña:{
        type:String,
        required:true
    },
    Baja:{
        type:Boolean,
        default:0
    },
    Admin:{
        type:Boolean,
        default:0        
    }

});

const Empleado = mongoose.model("empleado",EmpleadoSchema);
module.exports=Empleado;