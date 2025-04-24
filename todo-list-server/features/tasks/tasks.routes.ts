import express from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { createTodoListTask, deleteTodoListTask, getTasksByTodoListId, patchTodoListTask } from "./tasks.controller";

const router = express.Router();

router.get("/todo-list/:todoListId", authenticateUser, getTasksByTodoListId);
router.post("/todo-list/:todoListId", authenticateUser, createTodoListTask);
router.patch('/:taskId', authenticateUser, patchTodoListTask);
router.delete('/:taskId', authenticateUser, deleteTodoListTask);

export default router;
