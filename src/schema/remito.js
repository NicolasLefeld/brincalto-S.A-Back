const mongoose = require("mongoose");

const remitoSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["batea", "chasis", "ton"] },
    client_id: { type: String, required: true },
    date: { type: Date, required: true },
    remito_id: { type: String, required: true },
    product_id: { type: String, required: true },
    observation: { type: String, required: true },
    tons: { type: Number, required: false },
    price: { type: Number, required: true },
    status: { type: String, enum: ["pending", "processed"], required: true },
  },
  { collection: "sales" }
);

module.exports.remitoSchema = mongoose.model("remitoModel", remitoSchema);
