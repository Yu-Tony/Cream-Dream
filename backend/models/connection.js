const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    {
      useNewUrlParser: true,
      dbName: "CreamDreamBD",
    }
  )
  .then(() => console.log("Conectado a la base de datos MongoDB"))
  .catch(() => {
    console.log("No se pudo conectar con la base de datos");
    process.exit();
  });
