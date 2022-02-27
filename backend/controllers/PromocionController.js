
const Promo = require("../models/PromocionSchema");
const myModule = require('./validation');
var correcto = false;

exports.promo_getall = async(req,res)=>{
    const data = await Promo.find();

    res.send(data);
}

exports.promo_create = async(req,res)=>{
    const{ body }=req;

    let newPromo = new Promo(body);

    try
    {
      correcto = myModule.ValidatePromo(newPromo); 
  
    }catch (error) 
    {
      console.error(error);
    }

    if(correcto)
    {
        await newPromo
        .save()
        .then((newObject)=>console.log("Success!", newObject))
        .catch((err)=> console.error("oops!!", err))

        res.send(newPromo);
    }
    else{
        res.send("Error en el tipo de dato ingresado");
    }



   
}

exports.promo_delete = async(req,res)=>{
    const {id} = req.params;

    await Promo.deleteOne({_id:id});

    res.send({message:"Registro eliminado exitosamente"});
}

