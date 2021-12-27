const Joi = require('joi');

const UserCreatePayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

const UserUpdatePayloadSchema = Joi.object({
   fullname: Joi.string().required(),
})

module.exports = { UserCreatePayloadSchema, UserUpdatePayloadSchema };
