exports.up = pgm => {
  pgm.sql("INSERT INTO users(id, role_id, username, password, fullname) VALUES('user-admin', 'role-admin', 'admin', 'P@ssw0rd', 'Administrator')");
};

exports.down = pgm => {
  pgm.sql("DELETE FROM users WHERE username = 'admin'");
};
