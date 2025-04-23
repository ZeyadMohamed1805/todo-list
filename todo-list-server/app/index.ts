import express from 'express';
import authRoutes from '../features/auth/auth.routes';
import dotenv from "dotenv";
dotenv.config();

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/auth", authRoutes);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
