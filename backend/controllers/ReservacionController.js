const Reservacion = require("../models/ReservacionSchema");
const Mesa = require("../models/MesaSchema");
const CONST = require("../constants");
const { ValidateReservacion } = require("./validation");

exports.reservacion_create = async (req, res) => {
  const { body } = req;

  const result = ValidateReservacion(body);

  if (result) {
    //Aqui deberia de ir la validación de la información.
    let newReservacion = new Reservacion(body);

    await newReservacion //Funciones:
      .save() //Función si ese objeto modelo ya existe, lo actualiza; si es un objeto nuevo, lo inserta.
      .then((newObject) => 
      {
        console.log(CONST.created_success, newObject);

        res.send({
          success: true,
          message: `${"Reservación"} ${CONST.created_success}`,
          data: newObject,
        });
      })
      .catch((err) => {
        
        console.error(
          `${CONST.error.toUpperCase()}: ${err.message} in reservacion_create`
        );

        res.send({
          success: false,
          message: err.message,
        });

      });
  }
  else {
    console.log(`${CONST.valid_info.toUpperCase()}: in reservacion_create`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }

};

exports.reservacion_delete = async (req, res) => {
  const { id } = req.params;

  try {
    const reservaciondb = await Reservacion.findById(id);

    if (reservaciondb) {
      await Reservacion.findByIdAndDelete(id);

      console.log(`${"Reservación"} ${CONST.deleted_success}`);
      res.send({
        success: true,
        message: `reservación ${CONST.deleted_success}`,
      });
    } else {
      console.error(`${CONST.not_found.toUpperCase()}: in reservacion_delete`);
      res.send({
        success: false,
        message: `reservación ${CONST.not_found}`,
      });
    }

  }catch(err)
  {
    console.error(
      `${CONST.error.toUpperCase()}: ${err.message} in reservacion_delete`
    );
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.reservacion_getById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservaciondb = await Reservacion.findById(id);
    if (reservaciondb) {
      console.log(`${CONST.data_found.toUpperCase()} inreservacion_getById`);

      res.send({
        success: true,
        data: reservaciondb,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in reservacion_getById`);
      res.send({
        success: false,
        message: `reservación ${CONST.not_found}`,
      });
    }

  }catch(err)
  {
    console.log(
      `${CONST.error.toUpperCase()}: ${err.message} in reservacion_getById `
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.reservacion_getByPeopleDateSucursal = async (req, res) => {
  const { p, f, s } = req.query;

  try {
    const reservaciondb = await Mesa.find({ sillas: p, sucursal: s,});
    if (reservaciondb) {
      console.log(`${CONST.data_found.toUpperCase()} reservacion_getByPeopleDateSucursal`);

      res.send({
        success: true,
        data: reservaciondb,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in reservacion_getByPeopleDateSucursal`);
      res.send({
        success: false,
        message: `Reservacion ${CONST.not_found}`,
      });
    }
  }catch(err)
  {
    console.log(
      `${CONST.error.toUpperCase()}: ${err.message} in reservacion_getByPeopleDateSucursal `
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};
