const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      res.locals.user = decoded;
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});


// API Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// Web Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Render pages
app.get('/', (req, res) => res.render('index'));
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/tasks', (req, res) => res.render('tasks'));

app.use(require('./middleware/errorMiddleware'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
