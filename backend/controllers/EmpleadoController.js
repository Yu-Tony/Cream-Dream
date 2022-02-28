const Empleado = require("../models/EmpleadoSchema");
const CONST = require("../constants");

exports.empleado_create = async (req, res) => {
  const { body } = req;

  let newEmpleado = new Empleado(body);

  await newEmpleado
    .save()
    .then((newObject) => {
      console.log(CONST.created_success, newObject);

      res.send({
        success: true,
        message: `${newObject.nombre} ${CONST.created_success}`,
        data: newObject,
      });
    })
    .catch((err) => {
      //TODO: handle unique email error
      console.error(
        `${CONST.error.toUpperCase()}: ${err.message} in empleado_create`
      );

      res.send({
        success: false,
        message: err.message,
      });
    });
};

exports.empleado_login = async (req, res) => {
  const { correo, contrasena } = req.body;
  const empleadodb = await Empleado.findOne({ correo, contrasena });

  if (empleadodb) {
    console.log(`empleado ${correo} ${CONST.login}`);
    res.send({
      success: true,
      message: CONST.login,
    });
  } else {
    console.log(`empleado ${correo} ${CONST.invalid_cred}`);
    res.send({
      success: false,
      message: CONST.invalid_cred,
    });
  }
};

exports.empleado_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const empleadodb = await Empleado.findById(id);

    if (empleadodb) {
      const updated = await Empleado.findByIdAndUpdate(id, body);

      console.log(`empleado ${empleadodb.nombre} ${CONST.updated_success}`);
      res.send({
        success: true,
        message: `empleado ${CONST.updated_success}`,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in empleado_update`);
      res.send({
        success: false,
        message: `empleado ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(
      `${CONST.error.toUpperCase()}: ${err.message} in empleado_update`
    );
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.empleado_getById = async (req, res) => {
  const { id } = req.params;

  try {
    const empleadodb = await Empleado.findById(id);

    if (empleadodb) {
      console.log(`${CONST.data_found.toUpperCase()} empleado_getById`);

      res.send({
        success: true,
        data: empleadodb,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in empleado_getById`);
      res.send({
        success: false,
        message: `empleado ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(
      `${CONST.error.toUpperCase()}: ${err.message} in empleado_getById`
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.empleado_getBySucursal = async (req, res) => {
  const { s } = req.query;

  try {
    const empleadodb = await Empleado.find({ Sucursal: s });

    if (empleadodb) {
      console.log(`${CONST.data_found.toUpperCase()} empleado_getBySucursal`);
      res.send({
        success: true,
        data: empleadodb,
      });
    } else {
      console.log(
        `${CONST.not_found.toUpperCase()}: in empleado_getBySucursal`
      );
      res.send({
        success: false,
        message: `empleados ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(
      `${CONST.error.toUpperCase()}: ${err.message} in empleado_getBySucursal `
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};
