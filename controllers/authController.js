const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Gen JWN
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Reg new
// POST /auth/register
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).render('register', { error: 'User already exists' });
    }
    const user = await User.create({ username, email, password });
    const token = generateToken(user);
    // Set HTTP‑only cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};

// Login
// POST /auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user);
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.redirect('/dashboard');
    } else {
      res.status(401).render('login', { error: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};


// Logout
// GET /auth/logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};
