const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

// GET routes to render login and register pages
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// POST routes for form submissions
router.post('/register', register);
router.post('/login', login);

// Logout route
router.get('/logout', logout);

module.exports = router;
