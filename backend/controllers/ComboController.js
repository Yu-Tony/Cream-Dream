const Combo = require("../models/ComboSchema");
const CONST = require("../constants");

exports.combo_create = async (req, res) => {
  const { body } = req;
  let newCombo = new Combo(body);

  await newCombo
    .save()
    .then((newObject) =>
      console.log(CONST.created_success, newObject)
    )
    .catch((err) => {
      console.error(`${CONST.error.toUpperCase()}: ${err.message} in combo_create`);
      res.send(err.errors);
    });

  res.send(newCombo);
};

exports.combo_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const combodb = await Combo.findById(id);

  if (combodb) {
    const updated = await Combo.findOneAndUpdate({ _id: id }, body);
    res.send({ message: `${updated.nombre} ${CONST.updated_success}` });
  } else {
    res.send({ message: `combo ${CONST.not_found}` });
  }
};

exports.combo_delete = async (req, res) => {
  const { id } = req.params;

  await Combo.deleteOne({ _id: id });

  res.send({ message: CONST.deleted_success });
};

exports.combo_get = async (req, res) => {
  const { n } = req.query;
  if (n) {
    const data = await Combo.find({ nombre: n });

    if (data) {
      res.send(data);
    } else {
      res.send({ message: `${CONST.not_found.toUpperCase()}: in combo_get` });
    }
  } else {
    const data = await Combo.find();
    res.send(data);
  }
};

exports.combo_getById = async (req, res) => {
  const { id } = req.params;
  const data = await Combo.findById(id);

  if (data) {
    res.send(data);
  } else {
    res.send({ message: `${CONST.not_found.toUpperCase()}: in combo_getById` });
  }
};
