exports.up = pgm => {
  pgm.sql("INSERT INTO roles(id, rolecode, rolename, create_access, read_access, update_access, delete_access) VALUES('role-admin', 'admin', 'Administrator', true, true, true, true)");
  pgm.sql("INSERT INTO roles(id, rolecode, rolename, create_access, read_access, update_access, delete_access) VALUES('role-user', 'user', 'User', false, true, false, false)");
};

exports.down = pgm => {
  pgm.sql("DELETE FROM roles WHERE rolecode = 'admin' AND 'user'")
};
