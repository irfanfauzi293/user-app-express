exports.up = pgm => {
  pgm.createTable('roles', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    rolecode: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    rolename: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    create_access: {
      type: 'BOOLEAN',
      notNull: true
    },
    read_access: {
      type: 'BOOLEAN',
      notNull: true
    },
    update_access: {
      type: 'BOOLEAN',
      notNull: true
    },
    delete_access: {
      type: 'BOOLEAN',
      notNull: true
    },
  })

  pgm.addConstraint('users', 'fk_users.roleId_roles.id', 'FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE');
};

exports.down = pgm => {
  pgm.dropConstraint('users', 'fk_users.roleId_roles.id')
  pgm.dropTable('roles')
};
