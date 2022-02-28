const Resena = require("../models/ResenaSchema"); //Importamos el modelo del Resena
const CONST = require("../constants");
const { ValidateResena } = require("./validation");

//funcionalidad para insertar
exports.resena_create = async (req, res) => {
  const { body } = req; //Del request le sacamos el body.

  const result = ValidateResena(body);
  //Aqui deberia de ir la validación de la información.

  if (result) {

    let newResena = new Resena(body); //Con la info del body creo un objeto del tipo escuela, la guardo en la variable.

    await newResena //Funciones:
      .save() //Función si ese objeto modelo ya existe, lo actualiza; si es un objeto nuevo, lo inserta.
      .then((newObject) => 
      {
        console.log(CONST.created_success, newObject);
  
        res.send({
          success: true,
          message: `${"Reseña"} ${CONST.created_success}`,
          data: newObject,
        });
      })
      .catch((err) => {
        console.error(
          `${CONST.error.toUpperCase()}: ${err.message} in resena_create`
        );
  
        res.send({
          success: false,
          message: err.message,
        });
  
      });
  }else {
    console.log(`${CONST.valid_info.toUpperCase()}: in resena_create`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }



};

exports.resena_delete = async (req, res) => {
  const { id } = req.params;

  try {
    const resenadb = await Resena.findById(id);

    if (resenadb) {
      await Resena.findByIdAndDelete(id);

      console.log(`${"Reseña"} ${CONST.deleted_success}`);
      res.send({
        success: true,
        message: `Reseña ${CONST.deleted_success}`,
      });
    } else {
      console.error(`${CONST.not_found.toUpperCase()}: in resena_delete`);
      res.send({
        success: false,
        message: `Reseña ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.error(
      `${CONST.error.toUpperCase()}: ${err.message} in resena_delete`
    );
    res.send({
      success: false,
      message: err.message,
    });
  }

};

exports.resena_getByIdAndType = async (req, res) => {
  const { id } = req.params;
  const { t } = req.query;

  try
  {
    const resenadb = await Resena.find({ _id: id, tipo: t });
    if (resenadb) {
      console.log(`${CONST.data_found.toUpperCase()} in resena_getByIdAndType`);
      res.send({
        success: true,
        data: resenadb,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in resena_getByIdAndType`);
      res.send({
        success: false,
        message: `reseña ${CONST.not_found}`,
      });
    }
  } catch(err)
  {
    console.log(
      `${CONST.error.toUpperCase()}: ${err.message} in resena_getByIdAndType `
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
 
};
