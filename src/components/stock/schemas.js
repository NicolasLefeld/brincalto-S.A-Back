const Joi = require("joi");

const spareSchema = Joi.object({
  type: Joi.string().required(),
  quantity: Joi.number().required(),
  product: Joi.string().required(),
  comment: Joi.string().optional(),
});

const oilSchema = Joi.object({
  type: Joi.string().required(),
  liters: Joi.number().required(),
  availableLitters: Joi.number().required(),
  comment: Joi.string().required(),
});

const postStockSchema = Joi.alternatives().conditional(".type", {
  switch: [
    { is: "spare", then: spareSchema },
    { is: "oil", then: oilSchema },
  ],
});

module.exports = {
  postStockSchema,
};
