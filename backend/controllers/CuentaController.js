const Cuenta = require("../models/CuentaSchema");
const myModule = require('./validation');
var correcto = false;

exports.cuenta_create = async(req,res)=>{
    const{ body }=req;

    let newCuenta = new Cuenta(body);

  try
  {
    correcto = myModule.ValidateCuenta(newCuenta); 

  }catch (error) 
  {
    console.error(error);
  }

  if(correcto)
  {
    /*await newCuenta
    .save()
    .then((newObject)=>console.log("Success!", newObject))
    .catch((err)=> console.error("oops!!", err))*/

    res.send(newCuenta);
  }
  else{
    res.send("Error en el tipo de dato ingresado");
  }


}