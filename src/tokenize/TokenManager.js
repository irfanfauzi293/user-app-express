const Jwt = require('jsonwebtoken');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: 60 }),
  generateRefreshToken: (payload) => Jwt.sign(payload, process.env.REFRESH_TOKEN_KEY),
  verifyToken: (token, tokenKey = process.env.ACCESS_TOKEN_KEY) => {
    try {
      const decodedToken = Jwt.verify(token, tokenKey)
      return decodedToken;
    } catch (error) {
      throw new Error(`Invalid token: ${error.message}`);
    }
  },
}

module.exports = TokenManager;
