const { Pool } = require('pg');

class UsersDao {
  constructor() {
    this._pool = new Pool();
  }

  async insert({ id, roleId, username, password, fullname }) {
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, roleId, username, password, fullname]
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('Failed to insert new row');
    }

    return result.rows[0].id;
  }

  async update({id, fullname}) {
    const query = {
      text: 'UPDATE users SET fullname = $1 WHERE id = $2 RETURNING id',
      values: [fullname, id]
    };

    const result = await this._pool.query(query);
    
    if(!result.rowCount) {
      throw new Error('Failed to update user. User is not found')
    }

    return result.rows[0].id
  }

  async delete(id) {
    const query = {
      text: 'DELETE FROM users WHERE id = $1 RETURNING id',
      values: [id]
    };

    const result = await this._pool.query(query);

    if(!result.rowCount) {
      throw new Error('Failed to delete user. User is not found')
    }

    return result.rows[0].id;
  }

  async getUserByUserId(id) {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [id]
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getUserByUsername(username) {
    const query = {
      text: 'SELECT id, username FROM users WHERE username = $1',
      values: [username]
    };

    const result = await this._pool.query(query);

    return result.rows[0]
  }

  async getPasswordByUsername(username) {
    const query = {
      text: 'SELECT id, role_id, password FROM users WHERE username = $1',
      values: [username]
    };

    const result = await this._pool.query(query);

    return result;
  }
}

module.exports = UsersDao;
