##  MERN To-Do List App

A simple full-stack **To-Do List** application built using **MongoDB, Express, React, and Node.js (MERN Stack)**.
Users can **add, edit, mark complete, and delete** their tasks easily.

---

## Features

* Add new tasks
* Edit existing tasks
* Mark tasks as completed
* Delete tasks
* Real-time updates between frontend and backend

---

## 🧩 Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Tools:** Fetch API, Body-Parser, CORS


## ⚙️ Installation and Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/umamanipraharshitha/todolist_fullstack
cd todolist_fullstack
```

### 2️⃣ Install backend dependencies

```bash
cd backend
npm install
```

### 3️⃣ Set MongoDB URI

In your  `index.js`, replace:

```js
const uri = "your_uri";
```

with your actual **MongoDB connection string**.

### 4️⃣ Run backend server

```bash
node server.js
```

Server runs on 👉 `http://localhost:5000`

---

### 5️⃣ Install frontend dependencies

```bash
cd frontend
npm install
```

### 6️⃣ Start React app

```bash
npm start
```

Frontend runs on 👉 `http://localhost:3000`

---


## 🧰 Folder Structure

```
project/
│
├── index.js
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   ├── package.json
│
└── README.md
```

