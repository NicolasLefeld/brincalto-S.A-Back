require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("home"));
app.use("/stock", require("./components/stock/router"));
app.use("/provider", require("./components/provider/router"));
app.use("/auth", require("./components/auth/router"));
app.use("/product", require("./components/product/router"));
app.use("/client", require("./components/client/router"));
app.use("/purchases", require("./components/purchases/router"));
app.use("/sale", require("./components/sale/router"));

module.exports = app;
