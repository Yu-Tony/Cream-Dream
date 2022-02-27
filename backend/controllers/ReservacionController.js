const Reservacion = require("../models/ReservacionSchema");
const Mesa = require("../models/MesaSchema");
const CONST = require("../constants");

exports.reservacion_create = async (req, res) => {
  const { body } = req;

  //Aqui deberia de ir la validación de la información.
  let newReservacion = new Reservacion(body);

  await newReservacion //Funciones:
    .save() //Función si ese objeto modelo ya existe, lo actualiza; si es un objeto nuevo, lo inserta.
    .then((newObject) => console.log(CONST.created_success, newObject))
    .catch((err) => {
      console.error(`${CONST.error.toUpperCase()}: ${err.message} in reservacion_create`);
      res.send(err.errors);
    });

  res.send(newReservacion);
};

exports.reservacion_delete = async (req, res) => {
  const { id } = req.params;

  await Reservacion.deleteOne({ _id: id });

  res.send({ message: CONST.deleted_success });
};

exports.reservacion_getById = async (req, res) => {
  const { id } = req.params;
  const data = await Reservacion.findById(id);

  if (data) {
    res.send(data);
  } else {
    res.send({ message: `${CONST.not_found.toUpperCase()}: in reservacion_getById` });
  }
};

exports.reservacion_getByPeopleDateSucursal = async (req, res) => {
  const { p, f, s } = req.query;
  const data = await Mesa.find({
    sillas: p,
    sucursal: s,
  });

  if (data) {
    res.send(data);

    //TODO completar la reservacion
  } else {
    res.send({ message: `${CONST.not_found.toUpperCase()}: in reservacion_getByPeopleDateSucursal` });
  }
};
