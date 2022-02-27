const Resena = require("../models/ResenaSchema"); //Importamos el modelo del Resena
const myModule = require('./validation');
var correcto = false;

//funcionalidad para insertar
exports.resena_create = async (req, res) => {
  const { body } = req; //Del request le sacamos el body.

  //Aqui deberia de ir la validación de la información.

  let newResena = new Resena(body); //Con la info del body creo un objeto del tipo escuela, la guardo en la variable.

  try
  {
    correcto = myModule.ValidateResena(newResena); 

  }catch (error) 
  {
    console.error(error);
  }

  if(correcto)
  {
    await newResena //Funciones:
    .save() //Función si ese objeto modelo ya existe, lo actualiza; si es un objeto nuevo, lo inserta.
    .then((newObject) => console.log("Reseña creada con exito", newObject))
    .catch((err) => {
      console.error(
        "Ha ocurrido un problema al tratar de crear la reseña",
        err
      );
      res.send(err.errors); //Envia a la aplicación el mensaje de error(?)
    });

    res.send(newResena); // Responder a quien llamo a este servicio(endopoint) con el objeto nuevo creado.

  }
  else{
    res.send("Error en el tipo de dato ingresado");
  }



};

exports.resena_delete = async (req, res) => {
  const { id } = req.params;

  await Resena.deleteOne({ _id: id });

  res.send({ message: "Reseña eliminada exitosamente!" });
};

exports.resena_getByIdAndType = async (req, res) => {
  const { id } = req.params;
  const { t } = req.query;

  const data = await Resena.find({ _id: id, tipo: t });
  if (data) {
    res.send(data);
  } else {
    res.send({ message: "Registro inexistente" });
  }
};
