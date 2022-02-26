const Cliente = require("../models/ClienteSchema");
const CONST = require("../constants");

exports.cliente_signin = async (req, res) => {
  const { body } = req;

  let newCliente = new Cliente(body);

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
};

exports.cliente_login = async (req, res) => {
  const { correo, contraseña } = req.body;
  const clientedb = await Cliente.findOne({ correo, contraseña });

  if (clientedb) {
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
};

exports.cliente_update = async (req, res) => {
  const { id } = req.params;
  const { contraseña } = req.body;

  try {
    const clientedb = await Cliente.findById(id);

    if (clientedb) {
      const updated = await Cliente.findByIdAndUpdate(id, { contraseña });

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
