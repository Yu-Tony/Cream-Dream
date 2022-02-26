const Combo = require("../models/ComboSchema");

exports.combo_create = async (req, res) => {
  const { body } = req;
  let newCombo = new Combo(body);

  await newCombo
    .save()
    .then((newObject) =>
      console.log("Se creó correctamente el combo", newObject)
    )
    .catch((err) => {
      console.error("No se pudo crear correctamente el combo", err);
      res.send(err.errors);
    });

  res.send(newCombo);
};

exports.combo_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const combodb = await Combo.findById(id);

  if (combodb) {
    const data = await Combo.findOneAndUpdate({ _id: id }, body);
    res.send({ message: "Combo actualizado correctamente" });
  } else {
    res.send({ message: "No existe un combo con ese ID" });
  }
};

exports.combo_delete = async (req, res) => {
  const { id } = req.params;

  await Combo.deleteOne({ _id: id });

  res.send({ message: "Combo eliminado exitosamente" });
};

exports.combo_get = async (req, res) => {
  const { n } = req.query;
  if (n) {
    const data = await Combo.find({ nombre: n });

    if (data) {
      res.send(data);
    } else {
      res.send({ message: "El combo no existe" });
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
    res.send({ message: "El combo no existe" });
  }
};
