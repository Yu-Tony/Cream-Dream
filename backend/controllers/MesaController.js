const Mesa = require("../models/MesaSchema");
const CONST = require("../constants");

exports.mesa_create = async (req, res) => {
  const { body } = req;

  let newMesa = new Mesa(body);

  await newMesa
    .save()
    .then((newObject) => {
      console.log(CONST.created_success, newObject);
      res.send({ message: `mesa ${CONST.created_success}` });
    })
    .catch((err) => {
      console.log(`${CONST.error.toUpperCase()}: ${err.message} in mesa_create`);
    });
};

exports.mesa_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await Mesa.findByIdAndUpdate(id, body)
      .then((newObject) => {
        console.log(`mesa ${CONST.updated_success}`, newObject);
        res.send({ message: `mesa ${CONST.updated_success}` });
      })
      .catch((err) => {
        console.error(`${CONST.error.toUpperCase()}: ${err.message} in mesa_update`);
        res.send({ message: `mesa ${CONST.not_found}` });
      });
  } catch (err) {
    res.send(err);
  }
};

exports.mesa_availables = async (req, res) => {
  const { d, s } = req.query;

  const mesas = await Mesa.find({ sucursal: s, disponible: d });
  res.send(mesas);
};
