import express from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { createTodoListTask, getTasksByTodoListId } from "./tasks.controller";

const router = express.Router();

router.get("/todo-list/:todoListId", authenticateUser, getTasksByTodoListId);
router.post("/todo-list/:todoListId", authenticateUser, createTodoListTask);

export default router;
