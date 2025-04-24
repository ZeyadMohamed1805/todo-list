import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from '../features/auth/auth.routes';
import errorHandler from '../middlewares/errorHandler.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({ 
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`);
});
