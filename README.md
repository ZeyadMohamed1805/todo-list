# ✨ Nagwa's Todo List

**Nagwa's Todo List** is a modern task management application that empowers users to efficiently organize their tasks using multiple todo lists. It features a clean interface, drag-and-drop support, internationalization, image upload for lists, and a smooth user experience with dark/light theme support.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React + Vite  
- 🧠 TypeScript  
- 🔄 React Router  
- 🌍 React i18next (Internationalization)  
- 📦 React Query (Data fetching)  
- 💅 SCSS Modules  
- ✅ React Hook Form + Yup/Zod (Form validation)  
- 📁 React Dropzone (Image uploader)

### Backend
- 🚀 Node.js + Express.js  
- 🔐 TypeScript  
- 📂 Multer (Image upload)  
- 🧱 Prisma ORM + SQLite  

---

## ✨ Features

- 🔐 Authentication system (JWT-based)  
- 🗃️ CRUD for todo lists & tasks  
- 🖼️ Todo list image uploader  
- 🧲 Drag-and-drop tasks  
- 🌙 Dark/Light mode toggle  
- 🌐 Full internationalization (i18n) support  
- ✅ Form validation with Yup/Zod  

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ZeyadMohamed1805/todo-list.git
cd todo-list
```

### 2. Setup Environment Variables

Create a `.env` file in both `todo-list-client/` and `todo-list-server/` directories.

#### 🔐 Backend `.env` Example

```
NODE_ENV="local"
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="JWT_SECRET_KEY"
JWT_TOKEN_EXPIRATION=3600
JWT_REMEMBER_ME_EXPIRATION=604800
```

You can generate a new JWT_SECRET here: https://jwtsecret.com/generate

#### 🌐 Frontend `.env` Example

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_IMAGES_BASE_URL=http://localhost:5000
```

### 3. Run the Backend

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

### 4. Run the Frontend

```bash
cd client
npm install
npm run dev
```

---

### 5. Usage

- Create an account and login ( The credentials provided in the task are valid after running the seed command )  
- Add multiple todo lists  
- Upload icon for each list  
- CRUD operations on every list's tasks
- Drag-and-drop tasks to reorder  
- Toggle between dark/light mode  
- Switch languages (i18n)

---