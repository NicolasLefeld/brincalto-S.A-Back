require("dotenv").config();
const corsOptions = require("./util/corsOptions");
const { verifyToken } = require("./util/authJwt");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors(corsOptions()));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(verifyToken);
app.use("/stock", require("./components/stock/router"));
app.use("/providers", require("./components/providers/router"));
app.use("/auth", require("./components/auth/router"));
app.use("/products", require("./components/products/router"));
app.use("/clients", require("./components/clients/router"));
app.use("/purchases", require("./components/purchases/router"));
app.use("/sales", require("./components/sales/router"));
app.use("/logs", require("./components/log/router"));
app.use("/checks", require("./components/check/router"));
app.use("/charges", require("./components/charge/router"));

module.exports = app;
