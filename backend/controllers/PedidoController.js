const Pedido = require("../models/PedidoSchema");
const CONST = require("../constants");
const { ValidatePedido } = require("./validation");

exports.pedido_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (id == 0) {
    const result = true; //ValidatePedido(body);

    if (result) {
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
      console.log(`${CONST.valid_info.toUpperCase()}: in pedido_update`);
      res.send({
        success: false,
        message: CONST.valid_info,
      });
    }
  } else {
    try {
      const pedidodb = await Pedido.findById(id);

      if (pedidodb) {
        const updated = await Pedido.findByIdAndUpdate(
          id,
          {
            $push: { comidas: body.comidas },
            subtotal: body.subtotal,
          },
          { upsert: true, returnOriginal: false }
        );

        console.log(`pedido ${CONST.updated_success}`);
        res.send({
          success: true,
          message: `pedido ${CONST.updated_success}`,
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

exports.pedido_getById = async (req, res) => {
  const { id } = req.params;

  try {
    var pedidodb = await Pedido.findById(id);

    if (pedidodb) {
      console.log(`${CONST.data_found.toUpperCase()} pedido_getById`);

      pedidodb = await pedidodb.populate({
        path: "comidas",
        populate: { path: "comida", model: "comida" },
      });

      res.send({
        success: true,
        data: pedidodb,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in pedido_getById`);
      res.send({
        success: false,
        message: `pedido ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(
      `${CONST.error.toUpperCase()} ${err.message} in pedido_getById`
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};
