const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 5000;
require("./models/connection");

//const pedido_router = require("./routes/");
app.use(bodyParser.json());

//app.use("/api", pedido_router);

app.listen(port, () => {
  console.log("La aplicación está escuchando al puerto " + port);
});
