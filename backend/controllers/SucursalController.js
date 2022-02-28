const Sucursal = require("../models/SucursalSchema");
const CONST = require("../constants");
const { ValidateSucursal } = require("./validation");

exports.sucursal_create = async (req, res) => {
  const { body } = req;
  
  const result = ValidateSucursal(body);

  if (result) {
    let newSucursal = new Sucursal(body);
    await newSucursal
    .save()
    .then((newObject) => {
      console.log(`${CONST.created_success}`, newObject);
      res.send({
        success: true,
        message: `${newObject.nombre} ${CONST.created_success}`,
        data: newObject,
      });
    })
    .catch((err) => {
      console.error(
        `${CONST.error.toUpperCase()}: ${err.message} in sucursal_create`
      );
      res.send({
        success: false,
        message: err.message,
      });
    });
  }else {
    console.log(`${CONST.valid_info.toUpperCase()}: in sucursal_create`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }

 
};

exports.sucursal_delete = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const sucursaldb = await Sucursal.findById(id);

    if (sucursaldb) {
      const data = await Sucursal.findOneAndUpdate({ _id: id }, body, {
        returnOriginal: false,
      });
      console.log(`${sucursaldb.nombre} ${CONST.updated_success}`);
      res.send({
        success: true,
        message: `${sucursaldb.nombre} ${CONST.updated_success}`,
        data,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in sucursal_delete`);
      res.send({
        success: false,
        message: `sucursal ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(
      `${CONST.error.toUpperCase()} ${err.message} in sucursal_delete`
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.sucursal_getall = async (req, res) => {
  const data = await Sucursal.find();
  console.log(`${CONST.data_found.toUpperCase()} sucursal_getall`);
  res.send({
    success: true,
    message: `sucursal ${CONST.data_found}`,
    data,
  });
};

exports.sucursal_getById = async (req, res) => {
  const { id } = req.params;

  try {
    const sucursaldb = await Sucursal.findById(id);

    if (data) {
      console.log(`${CONST.data_found.toUpperCase()} sucursal_getById`);

      res.send({
        success: true,
        data: sucursaldb,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in sucursal_getById`);
      res.send({
        success: false,
        message: `sucursal ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(
      `${CONST.error.toUpperCase()}: ${err.message} in sucursal_getById `
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};
