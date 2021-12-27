const { AuthenticationPayloadSchema } = require('./schema');

const AuthenticationsValidator = {
  validateAuthenticationPayload: (payload) => {
    const validationResult = AuthenticationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  }
}

module.exports = AuthenticationsValidator;
