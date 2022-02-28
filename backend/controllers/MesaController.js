const Mesa = require("../models/MesaSchema");
const CONST = require("../constants");
const { ValidateMesa } = require("./validation");

exports.mesa_create = async (req, res) => {
  const { body } = req;

  const result = ValidateMesa(body);

  if (result) {
    let newMesa = new Mesa(body);

    await newMesa
      .save()
      .then((newObject) => {
        console.log(CONST.created_success, newObject);
        res.send({
          success: true,
          message: `mesa ${CONST.created_success}`,
          data: newObject,
        });
      })
      .catch((err) => {
        console.error(
          `${CONST.error.toUpperCase()}: ${err.message} in mesa_create`
        );
        res.send({
          success: false,
          message: err.message,
        });
      });
  } else {
    console.log(`${CONST.valid_info.toUpperCase()}: in mesa_create`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }
};

exports.mesa_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const result = ValidateMesa(body);

  if (result) {
    try {
      const mesadb = await Mesa.findById(id);

      if (mesadb) {
        const updated = await Mesa.findByIdAndUpdate(id, body, {
          returnOriginal: false,
        });

        console.log(`mesa ${CONST.updated_success}`);
        res.send({
          success: true,
          message: `mesa ${CONST.updated_success}`,
          data: updated,
        });
      } else {
        console.log(`${CONST.not_found.toUpperCase()}: in mesa_update`);
        res.send({
          success: false,
          message: `mesa ${CONST.not_found}`,
        });
      }
    } catch (err) {
      console.log(`${CONST.error.toUpperCase()} ${err.message} in mesa_update`);

      res.send({
        success: false,
        message: err.message,
      });
    }
  } else {
    console.log(`${CONST.valid_info.toUpperCase()}: in mesa_create`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }
};

exports.mesa_availables = async (req, res) => {
  const { d, s } = req.query;

  try {
    const data = await Mesa.find({ sucursal: s, disponible: d });

    if (data) {
      console.log(`${CONST.data_found.toUpperCase()} mesa_availables`);
      res.send({
        success: true,
        message: `mesas ${CONST.data_found}`,
        data,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in mesa_availables`);
      res.send({
        success: false,
        message: `mesas ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(
      `${CONST.error.toUpperCase()} ${err.message} in mesa_availables`
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};
