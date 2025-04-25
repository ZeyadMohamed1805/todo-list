import express from "express";
import { authenticateUser } from "../../middlewares/auth.middleware";
import { createTodoList, deleteTodoList, getTodoListById, getTodoLists, uploadTodoListIcon } from "./lists.controller";
import { upload } from "../../multer";
const router = express.Router();

router.get("/", authenticateUser, getTodoLists);
router.get("/:todoListId", authenticateUser, getTodoListById);
router.post("/", authenticateUser, createTodoList);
router.post("/:todoListId/upload-icon", authenticateUser, upload.single('icon'), uploadTodoListIcon);
router.delete("/:todoListId", authenticateUser, deleteTodoList);

export default router;
