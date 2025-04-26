import { UnAuthorizedError } from "../../errors/unAuthorized";
import { updateUserListById } from "../lists/lists.repository";
import { getUserList } from "../lists/lists.service";
import { TaskNotFoundError } from "./tasks.errors";
import { createListTask, deleteTaskById, getLastTaskInList, getTaskById, getTasksByListId, transactTaskQueries, updateTaskById, updateTaskForTransaction } from "./tasks.repository";

export const getListTasks = async (userId: number, listId: string) => {
    const todoList = await getUserList(userId, listId);

    return await getTasksByListId(todoList.id);
}

export const createTask = async (userId: number, listId: string, title: string) => {
    const todoList = await getUserList(userId, listId);

    const lastTask = await getLastTaskInList(todoList.id);

    const nextOrder = lastTask?.order != null ? lastTask.order + 1 : 0;

    const createdTask = await createListTask(todoList.id, title, nextOrder);

    const updatedTotal = todoList.totalTasksCount + 1;
    const progress = updatedTotal === 0
        ? 0
        : Math.round((todoList.completedTasksCount / updatedTotal) * 100);

    await updateUserListById(todoList.id, {
            totalTasksCount: updatedTotal,
            progress,
    });

    return createdTask;
}

export const updateTask = async (userId: number, taskId: string, body: Partial<{ title: string; isCompleted: boolean; order: number; }>) => {
    const task = await getTaskById(taskId);

    if (!task) {
        throw new TaskNotFoundError();
    }

    if (task.todoList.userId !== userId) {
        throw new UnAuthorizedError();
    }

    const wasCompleted = task.isCompleted;
    const willBeCompleted = body.isCompleted;

    if (typeof body.order === 'number') {
        const newOrder = body.order;

        const tasks = await getTasksByListId(task.todoListId);

        const currentIndex = tasks.findIndex((t) => t.id === taskId);
        const maxOrder = tasks.length - 1;

        const cappedNewOrder = Math.min(newOrder, maxOrder + 1);

        if (cappedNewOrder !== task.order) {
            tasks.splice(currentIndex, 1);

            tasks.splice(cappedNewOrder, 0, task);

            const updateTasks = tasks.map((task, index) => {
                return updateTaskForTransaction(task.id, { order: index });
            });

            await transactTaskQueries(updateTasks);
        }
    }

    const updatedTask = await updateTaskById(taskId, body);

    if (typeof willBeCompleted === 'boolean' && wasCompleted !== willBeCompleted) {
        const adjustment = willBeCompleted ? 1 : -1;
        const newCompletedCount = task.todoList.completedTasksCount + adjustment;

        const progress = task.todoList.totalTasksCount === 0
            ? 0
            : Math.round((newCompletedCount / task.todoList.totalTasksCount) * 100);

        await updateUserListById(task.todoListId, {
            
                completedTasksCount: newCompletedCount,
                progress
        });
    }

    return updatedTask;
}

export const deleteTask = async (userId: number, taskId: string) => {
    const task = await getTaskById(taskId);

    if (!task) {
        throw new TaskNotFoundError();
    }

    if (task.todoList.userId !== userId) {
        throw new UnAuthorizedError();
    }

    const todoList = task.todoList;
    const wasCompleted = task.isCompleted;

    await deleteTaskById(taskId);

    const remainingTasks = await getTasksByListId(todoList.id);

    const updateOrderPromises = remainingTasks.map((task, index) => 
        updateTaskForTransaction(task.id, { order: index })
    );

    await transactTaskQueries(updateOrderPromises);

    const newTotal = todoList.totalTasksCount - 1;
    const newCompleted = wasCompleted ? todoList.completedTasksCount - 1 : todoList.completedTasksCount;
    const progress = newTotal === 0 ? 0 : Math.round((newCompleted / newTotal) * 100);

    await updateUserListById(todoList.id, {
        totalTasksCount: newTotal,
        completedTasksCount: newCompleted,
        progress,
    });
}