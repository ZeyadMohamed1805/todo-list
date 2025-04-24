import express from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { createTodoList, getTodoLists } from "./lists.controller";
const router = express.Router();

router.get("/", authenticateUser, getTodoLists);
router.post("/", authenticateUser, createTodoList);

export default router;
