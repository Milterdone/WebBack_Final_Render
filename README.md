# Task Manager

A full-stack Task Manager web application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can register, log in, and manage tasks in a neat, clean and modern interface.

---

## Features

- **User Authentication:** Secure registration and login using JWT tokens stored in HTTP-only cookies.
- **Task Management:** Create, update (toggle task status), and delete tasks.
- **Dashboard:** Personalized greeting showing the logged-in user's username.
- **Responsive UI:** Clean, modern styling, intuitive button functionality and card components.
- **Modular Codebase:** Organized folders for models, controllers, routes, views, middleware, and static assets. Easily scalable from this state.
- **RBAC Foundation:** Only the person who has access to the mongoDB collections can delete entries (That's a hard bargain)

---

## Project Structure

```
task-manager/
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   ├── taskController.js
│   └── userController.js
├── middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models
│   ├── Task.js
│   └── User.js
├── public
│   ├── css
│   │   └── styles.css
│   └── js
│       ├── main.js
│       └── tasks.js
├── views
│   ├── partials
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── dashboard.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── tasks.ejs
├── routes
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

---

## Setup Instructions

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/YOUR_USERNAME/task-manager.git
   cd task-manager
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Create a `.env` File**  
   In the project root, create a `.env` file. Add your values:
   ```env
   PORT=<PORT>
   MONGO_URI=<YOUR_MONGODB_CONNECTION_LINK>
   JWT_SECRET=<YOUR_SECRET_KEY>
   ```

4. **Run the App Locally**  
   ```bash
   npm start
    # or
   node server
   ```
   By default, the app will run on `http://localhost:5000`.

5. **Open in Browser**  
   Visit `http://localhost:5000` to see the home page. Access links to register, log in, manage tasks, etc.

---

## API Endpoints

- **GET /auth/login** — Login page  
- **POST /auth/login** — Process login form submission (Check in DB)
- **GET /auth/register** — Registration page  
- **POST /auth/register** — Process registration form submission (Put in DB)
- **GET /auth/logout** — Log out the user (clears cookie)  

**Protected Task Endpoints** (require valid JWT token in cookie or header):
- **GET /api/tasks** — Get all tasks of the logged user  
- **POST /api/tasks** — Create a new task 
- **PUT /api/tasks/:id** — Update a task (toggle status)  
- **DELETE /api/tasks/:id** — Delete a task  

