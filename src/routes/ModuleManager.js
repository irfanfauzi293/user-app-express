const UsersDao = require('../dao/UsersDao');
const RolesDao = require('../dao/RolesDao');
const AuthenticationsDao = require('../dao/AuthenticationsDao');
const UsersService = require('../service/UsersService');
const AuthenticationsService = require('../service/AuthenticationsService');
const UsersController = require('../controller/UsersController');
const AuthenticationsController = require('../controller/AuthenticationsController');
const TokenManager = require('../tokenize/TokenManager');
const usersDao = new UsersDao();
const rolesDao = new RolesDao();
const authenticationsDao = new AuthenticationsDao();
const usersService = new UsersService(usersDao, rolesDao);
const usersController = new UsersController(usersService);
const authenticationsService = new AuthenticationsService(authenticationsDao);
const authenticationsController = new AuthenticationsController(authenticationsService, usersService, TokenManager);

module.exports = { usersController, authenticationsController };
