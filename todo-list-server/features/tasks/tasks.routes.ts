import express from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { getTasksByTodoListId } from "./tasks.controller";

const router = express.Router();

router.get("/todo-list/:todoListId", authenticateUser, getTasksByTodoListId);

export default router;
