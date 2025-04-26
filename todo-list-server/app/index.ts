import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from '../features/auth/auth.routes';
import todoListRoutes from '../features/lists/lists.routes';
import taskRoutes from '../features/tasks/tasks.routes';
import errorHandler from '../middlewares/errorHandler.middleware';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({ 
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/todo-lists", todoListRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`);
});
