const userAccess = require('../util/userAccess');

class UsersController {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postUser = this.postUser.bind(this);
    this.putUser = this.putUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async postUser(req, res) {
    try {
      userAccess.verifyCreateAcess(req.decoded);
      this._validator.validateUserCreatePayload(req.body);

      const { username, password, fullname } = req.body;

      const userId = await this._service.addUser({ username, password, fullname });

      res.json({
        status: 'success',
        message: 'User is created succesfully',
        data: {
          userId
        }
      });
    } catch (error) {
      res.json({
        status: 'failed',
        message: error.message
      });
    }
  }

  async getUser(req, res) {
    try {
      userAccess.verifyReadAccess(req.decoded);
      
      const { id, username, fullname } = await this._service.getUserInfo(req.decoded.id);

      res.json({
        status: 'success',
        data: {
          id,
          username,
          fullname,
        }
      })
    } catch (error) {
      console.log(error)
      res.json({
        status: 'failed',
        message: error.message
      })
    }
  }

  async putUser(req, res) {
    try {
      userAccess.verifyUpdateAccess(req.decoded);
      this._validator.validateUserUpdatePayload(req.body);

      const { fullname } = req.body;
      const { id } = req.params;
  
      await this._service.updateUser({ id, fullname });
  
      res.json({
        status: 'success',
        message: 'User is updated successfully'
      });
    } catch (error) {
      res.json({
        status: 'failed',
        message: error.message
      });
    }
  }

  async deleteUser(req, res) {
    try {
      userAccess.verifyDeleteAccess(req.decoded);

      const { id } = req.params;

      await this._service.deleteUser(id);

      res.json({
        status: 'success',
        message: 'User is deleted successfully'
      });
    } catch (error) {
      res.json({
        status: 'failed',
        message: error.message
      });
    }
  }
}

module.exports = UsersController;
