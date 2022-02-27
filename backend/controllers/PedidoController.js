const Pedido = require("../models/PedidoSchema");
const myModule = require('./validation');
var correcto = false;


exports.pedido_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (id == 0) {
    let newPedido = new Pedido(body);

    
    try
    {
      correcto = myModule.ValidatePedido(newPedido); 

    }catch (error) 
    {
      console.error(error);
    }

    if(correcto)
    {
      await newPedido
      .save()
      .then((newObject) =>
        console.log("Se creó correctamente el pedido", newObject)
      )
      .catch((err) => {
        console.error("No se pudo crear correctamente el pedido", err);
        res.send(err.errors);
      });

      res.send(newPedido);
    }
    else{
      res.send("Error en el tipo de dato ingresado");
    }
  

  } else {
    const pedidodb = await Pedido.findById(id);

    if (pedidodb) {
      const data = await Pedido.findByIdAndUpdate(
        id,
        { $push: { ...body } },
        { upsert: true, returnOriginal: false }
      );

      res.send({ message: "Pedido actualizado correctamente", data });
    }
  }
};
