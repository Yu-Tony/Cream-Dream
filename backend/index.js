const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 5000;
require("./models/connection");

/* require's de las rutas  */
const comida_router = require("./routes/ComidaRoutes");
const cliente_router = require("./routes/ClienteRoutes");

app.use(bodyParser.json());

app.use("/api", comida_router);
app.use("/api", cliente_router);

app.listen(port, () => {
  console.log("La aplicación está escuchando al puerto " + port);
});
