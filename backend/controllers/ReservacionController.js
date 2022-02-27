const Reservacion = require("../models/ReservacionSchema");
const Mesa = require("../models/MesaSchema");
const myModule = require('./validation');
var correcto = false;

exports.reservacion_create = async (req, res) => {
  const { body } = req;

  //Aqui deberia de ir la validación de la información.
  let newReservacion = new Reservacion(body);

  try
  {
    correcto = myModule.ValidateReservacion(newReservacion); 

  }catch (error) 
  {
    console.error(error);
  }

  if(correcto)
  {
    await newReservacion //Funciones:
    .save() //Función si ese objeto modelo ya existe, lo actualiza; si es un objeto nuevo, lo inserta.
    .then((newObject) => console.log("Reservación creada con exito", newObject))
    .catch((err) => {
      console.error("Oops! Error al querer hacer una reservación", err);
      res.send(err.errors);
    });

    res.send(newReservacion);
  }
  else{
    res.send("Error en el tipo de dato ingresado");
  }

 
};

exports.reservacion_delete = async (req, res) => {
  const { id } = req.params;

  await Reservacion.deleteOne({ _id: id });

  res.send({ message: "Reservación eliminada" });
};

exports.reservacion_getById = async (req, res) => {
  const { id } = req.params;
  const data = await Reservacion.findById(id);

  if (data) {
    res.send(data);
  } else {
    res.send({ message: "La reservación no existe" });
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
    res.send({ message: "No existe reservación con los datos ingresados" });
  }
};
