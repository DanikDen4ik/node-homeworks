const Joi = require("joi");

const userScheme = Joi.object({
  firstName: Joi.string().min(1).required(),
  secondName: Joi.string().min(1).required(),
  age: Joi.number().greater(0).less(150).required(),
  city: Joi.string().min(1),
});

const idScheme = Joi.object({
  id: Joi.number().required(),
});

module.exports = { userScheme, idScheme };
