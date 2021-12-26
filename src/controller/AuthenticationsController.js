class AuthenticationsController {
  constructor(authenticationsService, usersService, tokenManager) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;

    this.postLoginUser = this.postLoginUser.bind(this);
    this.putAuthentication = this.putAuthentication.bind(this);
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
      const { refreshToken } = req.body;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      const { id } = this._tokenManager.verifyToken(refreshToken, process.env.REFRESH_TOKEN_KEY);

      const accessToken = this._tokenManager.generateAccessToken({ id });
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
