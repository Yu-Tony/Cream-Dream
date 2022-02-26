const { query } = require("express");
const Empleado = require("../models/EmpleadoSchema");

exports.empleado_create = async (req, res) => {
  const { body } = req;

  let newEmpleado = new Empleado(body);

  await newEmpleado
    .save()
    .then((newObject) => console.log("Success!", newObject))
    .catch((err) => {
      //TODO: handle unique email error
      console.error("oops!!", err);
    });

  res.send(newEmpleado);
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
