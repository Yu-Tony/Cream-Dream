const Empleado = require("../models/EmpleadoSchema");
const CONST = require("../constants");
const { ValidatePersona } = require("./validation");
var bcrypt = require("bcrypt");

exports.empleado_create = async (req, res) => {
  const { body } = req;

  const result = ValidatePersona(body);

  if (result) {
    let newEmpleado = new Empleado(body);

    newEmpleado.contrasena = bcrypt.hashSync(newEmpleado.contrasena, 10);

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
  } else {
    console.log(`${CONST.valid_info.toUpperCase()}: in empleado_create`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }
};

exports.empleado_login = async (req, res) => {
  const { correo, contrasena } = req.body;

  const empleadodb = await Empleado.findOne({ correo });

  if (empleadodb) {
    bcrypt
      .compare(contrasena, empleadodb.contrasena)
      .then((result) => {
        if (result) {
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
      })
      .catch((err) => {
        console.log(`${CONST.error.toUpperCase()}: in empleado_login`);
        res.send({
          success: false,
          message: err,
        });
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

  const result = ValidatePersona(body);

  if (result) {
    try {
      const empleadodb = await Empleado.findById(id);

      if (empleadodb) {
        body.contrasena = bcrypt.hashSync(body.contrasena, 10);

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
  } else {
    console.log(`${CONST.valid_info.toUpperCase()}: in empleado_update`);
    res.send({
      success: false,
      message: CONST.valid_info,
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
