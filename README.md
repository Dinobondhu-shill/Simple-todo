# 📝 Todo Application Backend (TypeScript + Express + PostgreSQL)

A simple backend API built using **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL (NeonDB)**.  
This API supports full CRUD operations for **Users** and **Todos**.

---

## 🚀 Features

### **User Management**
- Create user  
- Get all users  
- Get a single user by ID  
- Update user  
- Delete user  

### **Todo Management**
- Create todo  
- Get all todos  
- Get todos by user  
- Update todo  
- Delete todo  

---

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL**
- **NeonDB**
- **pg (node-postgres)**

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd <project-folder>
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment variables

Create a `.env` file:

```
PORT=5000
DATABASE_URL="your-neon-db-connection-url"
```

---

## ▶️ Run the Project

### Development mode
```bash
npm run dev
```

### Production build
```bash
npm run build
npm start
```

---

## 🧪 API Endpoints

### **Users**

| Method | Endpoint            | Description |
|--------|----------------------|-------------|
| POST   | `/api/users`         | Create user |
| GET    | `/api/users`         | Get all users |
| GET    | `/api/users/:id`     | Get single user |
| PUT    | `/api/users/:id`     | Update user |
| DELETE | `/api/users/:id`     | Delete user |

---

### **Todos**

| Method | Endpoint                | Description |
|--------|--------------------------|-------------|
| POST   | `/api/todos`             | Create todo |
| GET    | `/api/todos`             | Get all todos |
| GET    | `/api/todos/user/:id`    | Get todos by user |
| PUT    | `/api/todos/:id`         | Update todo |
| DELETE | `/api/todos/:id`         | Delete todo |

---

## 🗄️ Database Structure

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(120) UNIQUE,
  age INT,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Todos Table
```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  isCompleted BOOLEAN DEFAULT false,
  date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔒 Error Handling & Validation
- Centralized error responses  
- Type-safe request handling with TypeScript  
- Clean query execution using `pg`  

---

## 🤝 Contribution
Feel free to fork and enhance the project. PRs are welcome.

---

## 🧑‍💻 Author
**Dinobondhu Shill**  
Backend Developer | MERN Stack | TypeScript
