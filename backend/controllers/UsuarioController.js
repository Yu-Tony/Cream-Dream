const Usuario = require("../models/UsuarioSchema");
const CONST = require("../constants");
const { ValidatePersona, ValidateContrasena } = require("./validation");
var bcrypt = require("bcrypt");

const TIPO_CLIENTE = 0;
const TIPO_EMPLEADO = 1;
const TIPO_ADMIN = 2;

exports.usuario_signin = async (req, res) => {
  const { body } = req;

  const result = ValidatePersona(body);

  if (result) {
    let newUsuario = new Usuario(body);

    newUsuario.contrasena = bcrypt.hashSync(newUsuario.contrasena, 10);

    await newUsuario
      .save()
      .then((newObject) => {
        console.log(`usuario ${newObject.nombre} ${CONST.singup}`);
        res.send({
          success: true,
          message: `${CONST.singup}`,
        });
      })
      .catch((err) => {
        console.error(
          `${CONST.error.toUpperCase()}: usuario_signin ${err.message}`
        );
        res.send({
          success: false,
          message: err.message,
          error_code: err.code,
        });
      });
  } else {
    console.log(`${CONST.valid_info.toUpperCase()}: in usuario_signin`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }
};

exports.usuario_login = async (req, res) => {
  const { correo, contrasena } = req.body;

  const usuariodb = await Usuario.findOne({ correo }).select({
    _id: 1,
    tipo: 1,
    contrasena: 1,
  });

  if (usuariodb) {
    bcrypt
      .compare(contrasena, usuariodb.contrasena)
      .then((result) => {
        if (result) {
          console.log(`usuario ${correo} ${CONST.login}`);
          res.send({
            success: true,
            message: CONST.login,
            data: { id: usuariodb._id, tipo: usuariodb.tipo },
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
        console.log(`${CONST.error.toUpperCase()}: in usuario_login`);
        res.send({
          success: false,
          message: err,
        });
      });
  } else {
    console.log(`usuario ${correo} ${CONST.invalid_cred}`);
    res.send({
      success: false,
      message: CONST.invalid_cred,
    });
  }
};

exports.usuario_update = async (req, res) => {
  const { id } = req.params;
  const { contrasena } = req.body;

  const result = ValidateContrasena({ contrasena });

  if (result) {
    try {
      const usuariodb = await Usuario.findById(id);

      if (usuariodb) {
        const contrasenaHashed = bcrypt.hashSync(contrasena, 10);

        const updated = await Usuario.findByIdAndUpdate(id, {
          contrasena: contrasenaHashed,
        });

        console.log(`usuario ${usuariodb.nombre} ${CONST.updated_success}`);
        res.send({
          success: true,
          message: `usuario ${CONST.updated_success}`,
        });
      } else {
        console.log(`${CONST.not_found.toUpperCase()}: in usuario_update`);
        res.send({
          success: false,
          message: `usuario ${CONST.not_found}`,
        });
      }
    } catch (err) {
      console.log(
        `${CONST.error.toUpperCase()}: ${err.message} in usuario_update`
      );
      res.send({
        success: false,
        message: err.message,
      });
    }
  } else {
    console.log(`${CONST.valid_info.toUpperCase()}: in usuario_update`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }
};

exports.usuario_delete = async (req, res) => {
  const { id } = req.params;

  try {
    const usuariodb = await Usuario.findById(id);

    if (usuariodb) {
      await Usuario.findByIdAndDelete(id);

      console.log(`${usuariodb.nombre} ${CONST.deleted_success}`);
      res.send({
        success: true,
        message: `usuario ${CONST.deleted_success}`,
      });
    } else {
      console.error(`${CONST.not_found.toUpperCase()}: in usuario_delete`);
      res.send({
        success: false,
        message: `usuario ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.error(
      `${CONST.error.toUpperCase()}: ${err.message} in usuario_delete`
    );
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.usuario_getById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuariodb = await Usuario.findById(id).select({
      correo: 1,
      nombre: 1,
      apellido: 1,
    });

    if (usuariodb) {
      console.log(`${CONST.data_found.toUpperCase()} usuario_getById`);

      res.send({
        success: true,
        data: usuariodb,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in usuario_getById`);
      res.send({
        success: false,
        message: `usuario ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.error(
      `${CONST.error.toUpperCase()}: ${err.message} in ususario_getById`
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.usuario_getBySucursal = async (req, res) => {
  const { s } = req.query;
  try {
    const usuariodb = await Usuario.find({ _sucursal: s, tipo: TIPO_EMPLEADO });

    if (usuariodb) {
      console.log(`${CONST.data_found.toUpperCase()} usuario_getBySucursal`);
      res.send({
        success: true,
        data: usuariodb,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in usuario_getBySucursal`);
      res.send({
        success: false,
        message: `usuario ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(
      `${CONST.error.toUpperCase()}: ${err.message} in usuario_getBySucursal `
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};
