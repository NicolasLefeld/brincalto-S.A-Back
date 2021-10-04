const mongoose = require("mongoose");

const remitoSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["batea", "chasis", "ton"] },
    client_id: { type: String },
    date: { type: Date },
    remito_id: { type: String },
    product_id: { type: String },
    observation: { type: String },
    tons: { type: Number },
    price: { type: Number },
    status: { type: String, enum: ["pending", "processed"] },
    statusId: { type: Number, default: 0 },
  },
  { collection: "sales" }
);

module.exports.remitoSchema = mongoose.model("remitoModel", remitoSchema);
