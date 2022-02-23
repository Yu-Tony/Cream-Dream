const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 5000;
require("./models/connection");

/* requiere's de las rutas */
const cliente_router = require("./routes/ClienteRoutes");

app.use(bodyParser.json());

app.use("/api", cliente_router);

app.listen(port, () => {
  console.log("La aplicación está escuchando al puerto " + port);
});
