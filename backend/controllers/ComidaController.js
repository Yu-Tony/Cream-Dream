const Comida = require("../models/ComidaSchema");
const CONST = require("../constants");

exports.comida_create = async (req, res) => {
  const { body } = req;

  let newComida = new Comida(body);

  await newComida
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
      console.error(
        `${CONST.error.toUpperCase()}: ${err.message} in comida_create`
      );

      res.send({
        success: false,
        message: err.message,
      });
    });
};

exports.comida_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const comidadb = await Comida.findById(id);

    if (comidadb) {
      //FOUNDED
      const updated = await Comida.findByIdAndUpdate(id, body, {
        returnOriginal: false,
      });

      console.log(`${updated.nombre} ${CONST.updated_success}`);
      res.send({
        success: true,
        message: `${updated.nombre} ${CONST.updated_success}`,
        data: updated,
      });
    } else {
      //NOT FOUND
      console.log(`${CONST.not_found.toUpperCase()}: in comida_update`);
      res.send({
        success: false,
        message: `comida ${CONST.not_found}`,
      });
    }
  } catch (err) {
    //ID NOT VALID
    console.log(`${CONST.error.toUpperCase()} ${err.message} in comida_update`);

    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.comida_getall_menu = async (req, res) => {
  const data = await Comida.find();

  console.log(`${CONST.data_found.toUpperCase()} comida_getall_menu`);
  res.send({
    success: true,
    message: `comidas ${CONST.data_found}`,
    data,
  });
};

exports.comida_getById = async (req, res) => {
  const { id } = req.params;

  try {
    const comidadb = await Comida.findById(id);
    if (comidadb) {
      console.log(`${CONST.data_found.toUpperCase()} comida_getById`);

      res.send({
        success: true,
        data: comidadb,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in comida_getById`);
      res.send({
        success: false,
        message: `comidas ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(
      `${CONST.error.toUpperCase()}: ${err.message} in comida_getById `
    );

    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.comida_getByQuery = async (req, res) => {
  const { n, c } = req.query;

  let query = "";

  if (n) query = n;
  if (c) query = c;

  var comidadb = null;

  if (n) {
    comidadb = await Comida.findOne({ nombre: query });
  }

  if (c) {
    comidadb = await Comida.find({ categoria: query });
  }

  if (comidadb && comidadb.length > 0) {
    console.log(`${CONST.data_found.toUpperCase()} comida_getByQuery`);
    res.send({
      success: true,
      data: comidadb,
    });
  } else {
    console.log(
      `${CONST.not_found.toUpperCase()}: comida_getByQuery("${n ? n : c}")`
    );
    res.send({
      success: false,
      message: `comida_getByQuery("${n ? n : c}") ${CONST.not_found}`,
    });
  }
};
