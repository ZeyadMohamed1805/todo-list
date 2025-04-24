import express from "express";
import { authenticateUser } from "../../middlewares/auth.middleware"; // Correct path to the middleware
import { getTodoLists } from "./lists.controller";
const router = express.Router();

router.get("/", authenticateUser, getTodoLists);

export default router;
