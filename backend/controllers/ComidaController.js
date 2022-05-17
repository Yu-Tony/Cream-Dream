const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { Storage } = require("../firebase/Storage");

const Comida = require("../models/ComidaSchema");
const CONST = require("../constants");
const { ValidateComida } = require("./validation");
const { comidaBodyParse, uploadImages } = require("../utils");

exports.comida_create = async (req, res) => {
  const { body, files } = req;

  const bodyaux = comidaBodyParse(body);
  const result = ValidateComida(bodyaux);

  if (result) {
    let newComida = new Comida(bodyaux);
    const urls = await uploadImages(
      files.imagenes,
      "productos",
      newComida.nombre
    );
    newComida.imagenes = [...urls];

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
  } else {
    console.log(`${CONST.valid_info.toUpperCase()}: in comida_create`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }
};

exports.comida_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const bodyaux = comidaBodyParse(body);
  const result = ValidateComida(bodyaux);

  if (result) {
    try {
      const comidadb = await Comida.findById(id);

      if (comidadb) {
        //FOUNDED
        const updated = await Comida.findByIdAndUpdate(id, bodyaux, {
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
      console.log(
        `${CONST.error.toUpperCase()} ${err.message} in comida_update`
      );

      res.send({
        success: false,
        message: err.message,
      });
    }
  } else {
    console.log(`${CONST.valid_info.toUpperCase()}: in comida_update`);
    res.send({
      success: false,
      message: CONST.valid_info,
    });
  }
};

exports.comida_getall_menu = async (req, res) => {
  const data = await Comida.find({}).select({
    nombre: 1,
    descripcion: 1,
    "precio.porcion": 1,
    imagen: { $first: "$imagenes" },
  });

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
    const comidadb = await Comida.findById(id).select({
      nombre: 1,
      descripcion: 1,
      precio: 1,
      imagenes: 1,
    });
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
  //Nombre, Categoria
  const { n, c } = req.query;

  let query = "";

  if (n) query = n;
  if (c) query = c;

  var comidadb = null;

  if (n) {
    comidadb = await Comida.find({ nombre: query }).select({
      nombre: 1,
      descripcion: 1,
      precio: 1,
      imagen: { $first: "$imagenes" },
    });
  }

  if (c) {
    comidadb = await Comida.find({ categoria: query }).select({
      nombre: 1,
      descripcion: 1,
      "precio.porcion": 1,
      imagen: { $first: "$imagenes" },
    });
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

exports.comida_image = async (req, res) => {
  //const files = { ...req.files };
  const array = await uploadImage("cafe", req.files);

  console.log({
    files: array,
  });
  res.send({
    files: array,
  });

  /*const image1 = req.files.image1;
  const image2 = req.files.image2;

  console.log({
    image1: image1.name,
    image2: image2.name,
    body: req.body,
  });
  res.send({
    image1: image1.name,
    image2: image2.name,
    body: req.body,
  });*/
  /*const comidaRef = ref(Storage, "comidas/image.jpg");
  uploadBytes(comidaRef, image1.data, {
    contentType: image1.mimetype,
  })
    .then(() => {
      console.log("Uploaded a blob or file!");

      res.send({
        success: true,
      });
    })
    .catch((error) => {
      console.log(err);
      res.send({
        error,
      });
    });*/
};
