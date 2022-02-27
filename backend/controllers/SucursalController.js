const Sucursal = require("../models/SucursalSchema");
const myModule = require('./validation');
var correcto = false;


exports.sucursal_create = async(req, res) =>
{
    const {body} = req;
    let newSucursal = new Sucursal(body);

    try
    {
      correcto = myModule.ValidateSucursal(newSucursal); 
  
    }catch (error) 
    {
      console.error(error);
    }

    

    if(correcto)
    {
        await newSucursal
        .save()
        .then((newObject) => console.log("Se creó correctamente la sucursal", newObject))
        .catch((err) =>
        {
            console.error("No se pudo crear correctamente la sucursal", err);
            res.send(err.errors);
        });

        res.send(newSucursal);
    }
    else{
        res.send("Error en el tipo de dato ingresado");
    }


  
   
}

exports.sucursal_delete = async(req, res) =>
{
    const {id} = req.params;
    const {body} = req;

    const sucursaldb = await Sucursal.findById(id);

    if(sucursaldb)
    {
    
        const data = await Sucursal.findOneAndUpdate({_id:id}, body);
        res.send({message: "Sucursal actualizado correctamente"});
    }
    else
    {
        res.send({message: "No existe una sucursal con ese ID"});
    }
}

exports.sucursal_getall= async(req, res) =>
{
    const data = await Sucursal.find();
    res.send(data);
}

exports.sucursal_getById = async(req, res) =>
{
    const{id} = req.params;
    const data= await Sucursal.findById(id);

    if(data)
    {
        res.send(data);
    }
    else
    {
        res.send({message: "La sucursal no existe"});
    }
}
