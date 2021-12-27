const Joi = require('joi');

const AuthenticationPayloadSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

module.exports = { AuthenticationPayloadSchema }