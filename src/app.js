require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("home"));
app.use("/stock", require("./components/stock/router"));
app.use("/check", require("./components/check/router"));
app.use("/client", require("./components/client/router"));
app.use("/destiny", require("./components/destiny/router"));
app.use("/payment", require("./components/payment/router"));
app.use("/personal", require("./components/personal/router"));
app.use("/provider", require("./components/provider/router"));
app.use("/purchase", require("./components/purchase/router"));
app.use("/remito", require("./components/remito/router"));
app.use("/sale", require("./components/sale/router"));
app.use("/vehicle", require("./components/vehicle/router"));
app.use("/auth", require("./components/auth/router"));

module.exports = app;
