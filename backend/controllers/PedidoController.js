const Pedido = require("../models/PedidoSchema");

exports.pedido_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (id == 0) {
    let newPedido = new Pedido(body);

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
