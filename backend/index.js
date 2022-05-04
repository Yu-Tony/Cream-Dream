const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const app = express();
const port = 5000;

app.use(cors());
app.use(fileupload());
require("./models/connection");

/* require's de las rutas  */
const comida_router = require("./routes/ComidaRoutes");
const cliente_router = require("./routes/ClienteRoutes");
const sucursal_router = require("./routes/SucursalRoutes");
const resena_router = require("./routes/ResenaRoutes");
const promo_router = require("./routes/PromocionRoutes");
const empleado_router = require("./routes/EmpleadoRoutes");
const mesa_router = require("./routes/MesaRoutes");
const reservacion_router = require("./routes/ReservacionRoutes");
const combo_router = require("./routes/ComboRoutes");
const pedido_router = require("./routes/PedidoRoutes");
const cuenta_router = require("./routes/CuentaRoutes");

app.use(bodyParser.json());

app.use("/api", comida_router);
app.use("/api", cliente_router);
app.use("/api", sucursal_router);
app.use("/api", resena_router);
app.use("/api", promo_router);
app.use("/api", empleado_router);
app.use("/api", mesa_router);
app.use("/api", reservacion_router);
app.use("/api", combo_router);
app.use("/api", pedido_router);
app.use("/api", cuenta_router);

app.listen(port, () => {
  console.log("La aplicación está escuchando al puerto " + port);
});
