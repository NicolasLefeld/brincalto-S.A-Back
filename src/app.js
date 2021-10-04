require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var whitelist = ['https://brincalto-front.herokuapp.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("home"));
app.use("/stock", require("./components/stock/router"));
app.use("/providers", require("./components/providers/router"));
app.use("/auth", require("./components/auth/router"));
app.use("/products", require("./components/products/router"));
app.use("/clients", require("./components/clients/router"));
app.use("/purchases", require("./components/purchases/router"));
app.use("/sales", require("./components/sales/router"));
app.use("/logs", require("./components/log/router"));

module.exports = app;
