const { nanoid } = require('nanoid');

class UsersService {
  constructor(usersDao, rolesDao) {
    this._usersDao = usersDao;
    this._rolesDao = rolesDao;
  }

  async addUser({ username, password, fullname }) {
    const id = `user-${nanoid(16)}`;
    await this.verifyUsername(username);
    const roleId = await this._rolesDao.getRoleIdByRoleCode({ rolecode: 'user' });
    const userId = await this._usersDao.insert({ id, roleId, username, password, fullname });
    return userId;
  }

  async updateUser({ id, fullname }) {
    const userId = await this._usersDao.update({ id, fullname });
    return userId;
  }

  async deleteUser(id) {
    await this._usersDao.delete(id);
  }

  async getUserInfo(id) {
    const result = await this._usersDao.getUserByUserId(id);
    if (!result) {
      throw new Error('User is not found');
    }
    return result;
  }

  async verifyUsername(username) {
    const user = await this._usersDao.getUserByUsername(username);
    if (user) {
      throw new Error('Invalid username: the username you entered is already registered in database')
    }
  }

  async verifyUserCredential(username, password) {
    const user = await this._usersDao.getPasswordByUsername(username, password);
    
    if (!user.rowCount) {
      throw new Error('Wrong given credential');
    }

    const { id, role_id: roleId, password: userPassword } = user.rows[0];

    const match = userPassword === password;

    if (!match) {
      throw new Error('Wrong given credential');
    }

    const { create_access, read_access, update_access, delete_access } = await this._rolesDao.getRoleByRoleId(roleId);

    return { id, createAccess: create_access, readAccess: read_access, updateAccess: update_access, deleteAccess: delete_access };
  }
}

module.exports = UsersService;
