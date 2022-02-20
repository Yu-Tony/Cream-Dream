const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 5000;
require("./models/connection");

app.use(bodyParser.json());

app.listen(port, () => {
  console.log("La aplicación está escuchando al puerto " + port);
});
