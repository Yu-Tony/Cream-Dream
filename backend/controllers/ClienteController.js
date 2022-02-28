const Cliente = require("../models/ClienteSchema");
const CONST = require("../constants");
const { ValidatePersona } = require("./validation");
var bcrypt = require("bcrypt");

exports.cliente_signin = async (req, res) => {
  const { body } = req;

  const result = ValidatePersona(body);

  if (result) {
    let newCliente = new Cliente(body);

    newCliente.contrasena = bcrypt.hashSync(newCliente.contrasena, 10);

    await newCliente
      .save()
      .then((newObject) => {
        console.log(`cliente ${newObject.nombre} ${CONST.singup}`);
        res.send({
          success: true,
          message: `${CONST.singup}`,
        });
      })
      .catch((err) => {
        console.error(
          `${CONST.error.toUpperCase()}: cliente_signin ${err.message}`
        );
        res.send({
          success: false,
          message: err.message,
          error_code: err.code,
        });
      });
  } else {
    console.log(`${CONST.valid_info.toUpperCase()}: in cliente_signin`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }
};

exports.cliente_login = async (req, res) => {
  const { correo, contrasena } = req.body;

  const clientedb = await Cliente.findOne({ correo });

  if (clientedb) {
    bcrypt
      .compare(contrasena, clientedb.contrasena)
      .then((result) => {
        if (result) {
          console.log(`cliente ${correo} ${CONST.login}`);
          res.send({
            success: true,
            message: CONST.login,
          });
        } else {
          console.log(`cliente ${correo} ${CONST.invalid_cred}`);
          res.send({
            success: false,
            message: CONST.invalid_cred,
          });
        }
      })
      .catch((err) => {
        console.log(`${CONST.error.toUpperCase()}: in cliente_login`);
        res.send({
          success: false,
          message: err,
        });
      });
  } else {
    console.log(`cliente ${correo} ${CONST.invalid_cred}`);
    res.send({
      success: false,
      message: CONST.invalid_cred,
    });
  }
};

exports.cliente_update = async (req, res) => {
  const { id } = req.params;
  const { contrasena } = req.body;

  const result = ValidatePersona({ contrasena });

  if (result) {
    try {
      const clientedb = await Cliente.findById(id);

      if (clientedb) {
        contrasena = bcrypt.hashSync(contrasena, 10);

        const updated = await Cliente.findByIdAndUpdate(id, { contrasena });

        console.log(`cliente ${clientedb.nombre} ${CONST.updated_success}`);
        res.send({
          success: true,
          message: `cliente ${CONST.updated_success}`,
        });
      } else {
        console.log(`${CONST.not_found.toUpperCase()}: in cliente_update`);
        res.send({
          success: false,
          message: `cliente ${CONST.not_found}`,
        });
      }
    } catch (err) {
      console.log(
        `${CONST.error.toUpperCase()}: ${err.message} in cliente_update`
      );
      res.send({
        success: false,
        message: err.message,
      });
    }
  } else {
    console.log(`${CONST.valid_info.toUpperCase()}: in cliente_update`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }
};

exports.cliente_delete = async (req, res) => {
  const { id } = req.params;

  try {
    const clientedb = await Cliente.findById(id);

    if (clientedb) {
      await Cliente.findByIdAndDelete(id);

      console.log(`${clientedb.nombre} ${CONST.deleted_success}`);
      res.send({
        success: true,
        message: `cliente ${CONST.deleted_success}`,
      });
    } else {
      console.error(`${CONST.not_found.toUpperCase()}: in cliente_delete`);
      res.send({
        success: false,
        message: `cliente ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.error(
      `${CONST.error.toUpperCase()}: ${err.message} in cliente_delete`
    );
    res.send({
      success: false,
      message: err.message,
    });
  }
};
