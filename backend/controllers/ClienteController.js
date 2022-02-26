const Cliente = require("../models/ClienteSchema");

exports.cliente_signin = async (req, res) => {
  const { body } = req;

  let newCliente = new Cliente(body);

  await newCliente
    .save()
    .then((newObject) => {
      console.log("Success", newObject);
      res.send({ message: "sign up successfully" });
    })
    .catch((err) => {
      console.error("error-cliente_signin");
      res.send({ message: "error" });
    });
};

exports.cliente_login = async (req, res) => {
  const { correo, contraseña } = req.body;
  const clientedb = await Cliente.findOne({ correo, contraseña });

  if (clientedb) {
    res.send({ message: "login" });
  } else {
    res.send({ message: "Invalid credentials" });
  }
};

exports.cliente_update = async (req, res) => {
  const { id } = req.params;
  const { contraseña } = req.body;

  try {
    const clientedb = await Cliente.findById(id);

    if (clientedb) {
      const updated = await Cliente.findByIdAndUpdate(id, { contraseña });

      res.send({ message: "Updated" });
    } else {
      res.send({ message: "cliente_update not found" });
    }
  } catch (err) {
    res.send(err);
  }
};

exports.cliente_delete = async (req, res) => {
  const { id } = req.params;

  await Cliente.findByIdAndDelete(id)
    .then(() => res.send({ message: "Deleted" }))
    .catch((err) => {
      console.error("error-cliente_delete");
      res.send({ message: err });
    });
};
