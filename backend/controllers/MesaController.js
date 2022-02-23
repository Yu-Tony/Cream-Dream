const Mesa = require("../models/MesaSchema");

exports.mesa_create = async (req, res) => {
  const { body } = req;

  let newMesa = new Mesa(body);

  await newMesa
    .save()
    .then((newObject) => {
      console.log("Success", newObject);
      res.send({ message: "Success" });
    })
    .catch((err) => {
      console.log("error mesa.mesa_create");
    });
};

exports.mesa_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await Mesa.findByIdAndUpdate(id, body)
      .then((newObject) => {
        console.log("Updated", newObject);
        res.send({ message: "Updated" });
      })
      .catch((err) => {
        console.error("error mesa.mesa_update", err);
        res.send({ message: "Error updating mesa" });
      });
  } catch (err) {
    res.send(err);
  }
};

exports.mesa_availables = async (req, res) => {
  const { d, s } = req.params;

  const mesas = await Mesa.find({ _sucursal: s, disponible: d });
  res.send(data);
};
