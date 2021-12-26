const { Pool } = require("pg");

class RolesDao {
  constructor() {
    this._pool = new Pool();
  }

  async getRoleIdByRoleCode({ rolecode }) {
    const query = {
      text: 'SELECT id FROM roles WHERE rolecode = $1',
      values: [rolecode]
    }

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('Role is not found')
    }

    return result.rows[0].id;
  }

  async getRoleByRoleId(roleId) {
    const query = {
      text: 'SELECT * from roles WHERE id = $1',
      values: [roleId]
    }

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = RolesDao;
