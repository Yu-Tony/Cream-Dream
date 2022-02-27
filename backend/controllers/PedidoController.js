const Pedido = require("../models/PedidoSchema");

exports.pedido_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (id == 0) {
    let newPedido = new Pedido(body);

    await newPedido
      .save()
      .then((newObject) => {
        console.log(CONST.created_success, newObject);
        res.send({
          success: true,
          message: `pedido ${CONST.created_success}`,
          data: newObject,
        });
      })
      .catch((err) => {
        console.error(
          `${CONST.error.toUpperCase()}: ${err.message} in pedido_update`
        );
        res.send({
          success: false,
          message: err.message,
        });
      });
  } else {
    try {
      const pedidodb = await Pedido.findById(id);

      if (pedidodb) {
        const updated = await Pedido.findByIdAndUpdate(
          id,
          { $push: { ...body } },
          { upsert: true, returnOriginal: false }
        );

        console.log(`pedido ${CONST.updated_success}`);
        res.send({
          success: true,
          message: `${updated.nombre} ${CONST.updated_success}`,
          data: updated,
        });
      } else {
        console.log(`${CONST.not_found.toUpperCase()}: in pedido_update`);
        res.send({
          success: false,
          message: `pedido ${CONST.not_found}`,
        });
      }
    } catch (err) {
      console.log(
        `${CONST.error.toUpperCase()} ${err.message} in pedido_update`
      );

      res.send({
        success: false,
        message: err.message,
      });
    }
  }
};
