const Comida = require("../models/ComidaSchema");
const myModule = require('./validation');
var correcto = false;

exports.comida_create = async (req, res) => {
  const { body } = req;

  let newComida = new Comida(body);

  try
  {
    correcto = myModule.ValidateComida(newComida); 

  }catch (error) 
  {
    console.error(error);
  }

  if(correcto)
  {
    await newComida
    .save()
    .then((newObject) => {
      console.log("Success", newObject);
      res.send("ok");
    })
    .catch((err) => {
      console.error("error-comida_create", err);
      res.send("error al crear la comida");
    });

  }
  else{
    res.send("Error en el tipo de dato ingresado");
  }

 
  

  
};

exports.comida_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const comidadb = await Comida.findById(id);

    if (comidadb) {
      //res.send(comidadb);
      const updated = await Comida.findByIdAndUpdate(id, body, {
        returnOriginal: false,
      });
      res.send({ message: "Updated" });
    } else {
      res.send({ message: "error-comida_update not-found" });
    }
  } catch (err) {
    res.send(err);
  }
};

exports.comida_getall_menu = async (req, res) => {
  const data = await Comida.find();
  res.send(data);
};

exports.comida_getById = async (req, res) => {
  const { id } = req.params;
  const comidadb = await Comida.findById(id);

  if (comidadb) {
    res.send(comidadb);
  } else {
    res.send({ message: "error-comida_getById not-found" });
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

  if (comidadb) {
    res.send(comidadb);
  } else {
    res.send({ message: "error-comida_getByName not-found" });
  }
};
