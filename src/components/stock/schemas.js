const Joi = require("joi");

const postSpareSchema = Joi.object({
  type: Joi.string().required(),
  quantity: Joi.number().required(),
  product: Joi.string().required(),
  comment: Joi.string().optional(),
});

const postOilSchema = Joi.object({
  type: Joi.string().required(),
  liters: Joi.number().required(),
  availableLitters: Joi.number().required(),
  comment: Joi.string().required(),
});

const postStockSchema = Joi.alternatives().conditional(".type", {
  switch: [
    { is: "spare", then: postSpareSchema },
    { is: "oil", then: postOilSchema },
  ],
});

const updateSpareSchema = Joi.object({
  type: Joi.string().required(),
  quantity: Joi.number().required(),
  product: Joi.string().required(),
  comment: Joi.string().optional(),
});

const updateOilSchema = Joi.object({
  type: Joi.string().required(),
  liters: Joi.number().required(),
  availableLitters: Joi.number().required(),
  comment: Joi.string().required(),
});

const updateOilMovementSchema = Joi.object({
  type: Joi.string().required(),
  littersTaken: Joi.number().required(),
  comment: Joi.string().required(),
});

const updateStockSchema = Joi.alternatives().conditional(".type", {
  switch: [
    { is: "spare", then: updateSpareSchema },
    { is: "oil", then: updateOilSchema },
    { is: "oilMovement", then: updateOilMovementSchema },
  ],
});

module.exports = {
  postStockSchema,
  updateStockSchema,
};
