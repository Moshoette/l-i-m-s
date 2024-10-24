// lmis-backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login Route
router.post('/login', (req, res) => {
  const { email, password, rollNumber, name } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        return res.json({ token, user });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    });
  });
});

// Signup Route
router.post('/signup', (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  User.create({ email, password: hashedPassword, role }, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating user' });
    }
    return res.status(201).json({ message: 'User created' });
  });
});

module.exports = router;
