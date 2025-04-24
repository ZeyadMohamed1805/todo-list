import express from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { createTodoList, deleteTodoList, getTodoLists } from "./lists.controller";
const router = express.Router();

router.get("/", authenticateUser, getTodoLists);
router.post("/", authenticateUser, createTodoList);
router.delete("/:todoListId", authenticateUser, deleteTodoList);

export default router;
