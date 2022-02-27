const { query } = require("express");
const Empleado = require("../models/EmpleadoSchema");
const myModule = require('./validation');
var correcto = false;
var bcrypt = require('bcrypt');

exports.empleado_create = async (req, res) => {
  const { body } = req;

  let newEmpleado = new Empleado(body);

  try
  {
    correcto = myModule.ValidatePersona(newEmpleado); 

  }catch (error) 
  {
    console.error(error);
  }

  if(correcto)
  {
    //uses a cost parameter that specify the number of cycles to use in the algorithm. The cost parameter is represented by an integer value between 4 to 31
    newEmpleado.contrasena = bcrypt.hashSync(newEmpleado.contrasena, 10);

    await newEmpleado
    .save()
    .then((newObject) => console.log("Success!", newObject))
    .catch((err) => {
      //TODO: handle unique email error
      console.error("oops!!", err);
    });

    res.send(newEmpleado);

  }
  else{
    res.send("Error en el tipo de dato ingresado");
  }


  
};

exports.empleado_login = async (req, res) => {
  const { correo, contrasena } = req.body;
  const empleadodb = await Empleado.findOne({ correo, contrasena });

  if (empleadodb) {
    res.send({ message: "login" });
  } else {
    res.send({ message: "Invalid credentials" });
  }
};

exports.empleado_update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const empleadodb = await Empleado.findById(id);

    if (empleadodb) {
      const updated = await Empleado.findByIdAndUpdate(id, body);

      res.send({ message: "El empleado se modifico" });
    } else {
      res.send({ message: "Empleado not found" });
    }
  } catch (err) {
    res.send(err);
  }
};

exports.empleado_getById = async (req, res) => {
  const { id } = req.params;
  const empleadodb = await Empleado.findById(id);

  if (empleadodb) {
    res.send(empleadodb);
  } else {
    res.send({ message: "error-empleado not-found" });
  }
};

exports.empleado_getBySucursal = async (req, res) => {
  const { s } = req.query;

  const empleadodb = await Empleado.find({ Sucursal: s });

  if (empleadodb) {
    res.send(empleadodb);
  } else {
    res.send({ message: "error-empleado not-found" });
  }
};
