
const Promo = require("../models/PromocionSchema");

exports.promo_getall = async(req,res)=>{
    const data = await Promo.find();

    res.send(data);
}

exports.promo_create = async(req,res)=>{
    const{ body }=req;

    let newPromo = new Promo(body);

    await newPromo
    .save()
    .then((newObject)=>console.log("Success!", newObject))
    .catch((err)=> console.error("oops!!", err))

    res.send(newPromo);
}

exports.promo_delete = async(req,res)=>{
    const {id} = req.params;

    await Promo.deleteOne({_id:id});

    res.send({message:"Registro eliminado exitosamente"});
}

