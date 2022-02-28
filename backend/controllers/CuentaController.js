const Cuenta = require("../models/CuentaSchema");
const CONST = require("../constants");

exports.cuenta_create = async (req, res) => {
  const { body } = req;

  let newCuenta = new Cuenta(body);

  await newCuenta
    .save()
    .then((newObject) => {
      console.log(CONST.created_success, newObject);
      res.send({
        success: true,
        message: `cuenta ${CONST.created_success}`,
        data: newObject,
      });
    })
    .catch((err) => {
      console.error(
        `${CONST.error.toUpperCase()}: ${err.message} in cuenta_create`
      );
      res.send({
        success: false,
        message: err.message,
      });
    });
};
