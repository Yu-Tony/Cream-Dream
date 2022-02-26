const Cuenta = require("../models/CuentaSchema");

exports.cuenta_create = async(req,res)=>{
    const{ body }=req;

    let newCuenta = new Cuenta(body);

    await newCuenta
    .save()
    .then((newObject)=>console.log("Success!", newObject))
    .catch((err)=> console.error("oops!!", err))

    res.send(newCuenta);
}