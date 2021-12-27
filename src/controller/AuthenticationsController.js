class AuthenticationsController {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postLoginUser = this.postLoginUser.bind(this);
    this.putAuthentication = this.putAuthentication.bind(this);
    this.deleteAuthentication = this.deleteAuthentication.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  async postLoginUser(req, res) {
    try {
      const { username, password } = req.body;
      const { 
        id, createAccess, updateAccess, readAccess, deleteAccess 
      } = await this._usersService.verifyUserCredential(username, password);

      const accessToken = this._tokenManager.generateAccessToken({ id, createAccess, updateAccess, readAccess, deleteAccess });
      const refreshToken = this._tokenManager.generateRefreshToken({ id, createAccess, updateAccess, readAccess, deleteAccess });

      await this._authenticationsService.addRefreshToken(refreshToken);
      
      res.json({
        status: 'success',
        message: 'Login successfully',
        data: {
          accessToken,
          refreshToken
        }
      })
    } catch (error) {
      res.json({
        status: 'failed',
        message: error.message
      })
    }
  }

  async putAuthentication(req, res) {
    try {
      this._validator.validateAuthenticationPayload(req.body);

      const { refreshToken } = req.body;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      const { id, createAccess, readAccess, updateAccess, deleteAccess } = this._tokenManager.verifyToken(refreshToken, process.env.REFRESH_TOKEN_KEY);

      const accessToken = this._tokenManager.generateAccessToken({ id, createAccess, readAccess, updateAccess, deleteAccess });
      res.json({
        status: 'success',
        message: 'Access Token is Updated',
        data: {
          accessToken
        }
      })
    } catch (error) {
      res.json({
        status: 'failed',
        message: error.message
      })
    }
  }

  async deleteAuthentication(req, res) {
    try {
      this._validator.validateAuthenticationPayload(req.body);

      const { refreshToken } = req.body;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      await this._authenticationsService.deleteRefreshToken(refreshToken);

      res.json({
        status: 'success',
        message: 'Refresh token is deleted'
      });
    } catch (error) {
      res.json()
    }
  }

  async verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        const decodedToken = this._tokenManager.verifyToken(token);
  
        req.decoded = decodedToken;
        next();
      } else {
        throw new Error('Invalid Token')
      }
    } catch (error) {
      res.json({
        status: 'failed',
        message: error.message
      });
    }
  }
}

module.exports = AuthenticationsController;
