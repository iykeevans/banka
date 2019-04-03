const Joi = require('joi');

exports.checkSignup = (data) => {
  const schema = Joi.object().keys({
    id: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().required(),
    type: Joi.string().required(),
    isAdmin: Joi.string().default(false),
  });
  return schema.validate(data);
};

exports.checkLogin = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};
