// lmis-backend/models/User.js
const db = require('../config/db');

const User = {
  create: (newUser, callback) => {
    const sql = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    db.query(sql, [newUser.email, newUser.password, newUser.role], callback);
  },
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },
  // Other methods like update, delete can be added here
};

module.exports = User;
