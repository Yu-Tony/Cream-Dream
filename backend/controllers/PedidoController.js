const Pedido = require("../models/PedidoSchema");

exports.pedido_update = async(req, res) =>
{
    const {id} = req.params;
    const {body} = req;

    const pedidodb = await Pedido.findById(id);

    if(pedidodb)
    {
       pedidodb = {pedidodb, ...body}

        const data = await Pedido.findOneAndUpdate({_id:id}, pedidodb);
        res.send({message: "Pedido actualizado correctamente"});
    }
    else
    {
        const {body} = req;
        let newPedido = new Pedido(body);
    
        await newPedido
            .save()
            .then((newObject) => console.log("Se creó correctamente el pedido", newObject))
            .catch((err) =>
            {
                console.error("No se pudo crear correctamente", err);
                res.send(err.errors);
            });
    
        res.send(newPedido);
    }

   
}