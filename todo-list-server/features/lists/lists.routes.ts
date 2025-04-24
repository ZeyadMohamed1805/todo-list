import express from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { createTodoList, deleteTodoList, getTodoListById, getTodoLists } from "./lists.controller";
const router = express.Router();

router.get("/", authenticateUser, getTodoLists);
router.get("/:todoListId", authenticateUser, getTodoListById);
router.post("/", authenticateUser, createTodoList);
router.delete("/:todoListId", authenticateUser, deleteTodoList);

export default router;
