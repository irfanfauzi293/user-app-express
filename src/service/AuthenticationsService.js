class AuthenticationsService {
  constructor(authenticationDao) {
    this._authenticationDao = authenticationDao;
  }
  
  async addRefreshToken(token) {
    await this._authenticationDao.insertToken(token);
  }

  async verifyRefreshToken(token) {
    const result = await this._authenticationDao.getToken(token);
    if (!result) {
      throw new Error('Invalid refresh token');
    }
  }

  async deleteRefreshToken(token) {
    await this.verifyRefreshToken(token);

    await this._authenticationDao.deleteToken(token);
  }
}

module.exports = AuthenticationsService;
