const { UserCreatePayloadSchema, UserUpdatePayloadSchema } = require('./schema');

const UsersValidator = {
  validateUserCreatePayload: (payload) => {
    const validationResult = UserCreatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
  validateUserUpdatePayload: (payload) => {
    const validationResult = UserUpdatePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  }
};

module.exports = UsersValidator;
