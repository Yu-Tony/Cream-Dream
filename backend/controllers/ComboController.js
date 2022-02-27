const Combo = require("../models/ComboSchema");
const CONST = require("../constants");

exports.combo_create = async (req, res) => {
  const { body } = req;
  let newCombo = new Combo(body);

  await newCombo
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
        `${CONST.error.toUpperCase()}: ${err.message} in combo_create`
      );
      res.send({
        success: false,
        message: err.message,
      });
    });
};

exports.combo_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const combodb = await Combo.findById(id);

    if (combodb) {
      const updated = await Combo.findOneAndUpdate({ _id: id }, body, {
        returnOriginal: false,
      });

      console.log(`${updated.nombre} ${CONST.updated_success}`);
      res.send({
        success: true,
        message: `${updated.nombre} ${CONST.updated_success}`,
        data: updated,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in combo_update`);
      res.send({
        success: false,
        message: `combo ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(`${CONST.error.toUpperCase()} ${err.message} in combo_update`);

    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.combo_delete = async (req, res) => {
  const { id } = req.params;

  try {
    const combodb = await Combo.findById(id);

    if (combodb) {
      await Combo.deleteOne({ _id: id });

      console.log(`${combodb.nombre} ${CONST.deleted_success}`);
      res.send({
        success: true,
        message: `cliente ${CONST.deleted_success}`,
      });
    } else {
      console.error(`${CONST.not_found.toUpperCase()}: in combo_delete`);
      res.send({
        success: false,
        message: `combo ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.error(
      `${CONST.error.toUpperCase()}: ${err.message} in combo_delete`
    );
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.combo_get = async (req, res) => {
  const { n } = req.query;
  if (n) {
    const data = await Combo.find({ nombre: n });

    if (data) {
      console.log(`${CONST.data_found.toUpperCase()} combo_get`);
      res.send({
        success: true,
        message: `combos ${CONST.data_found}`,
        data,
      });
    } else {
      console.log(`${CONST.not_data_found.toUpperCase()}: in combo_get`);
      res.send({
        success: false,
        message: `combo ${CONST.not_found}`,
      });
    }
  } else {
    const data = await Combo.find();
    res.send(data);
  }
};

exports.combo_getById = async (req, res) => {
  const { id } = req.params;

  try {
    const combodb = await Combo.findById(id);

    if (combodb) {
      console.log(`${CONST.data_found.toUpperCase()} combo_getById`);
      res.send({
        success: true,
        data: combodb,
      });
    } else {
      console.log(`${CONST.not_found.toUpperCase()}: in combo_getById`);
      res.send({
        success: false,
        message: `combos ${CONST.not_found}`,
      });
    }
  } catch (err) {
    console.log(
      `${CONST.error.toUpperCase()}: ${err.message} in combo_getById `
    );
    res.send({
      success: false,
      message: err.message,
    });
  }
};
