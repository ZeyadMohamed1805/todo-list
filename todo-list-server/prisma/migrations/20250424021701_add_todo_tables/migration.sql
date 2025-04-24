-- CreateTable
CREATE TABLE "TodoList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imagePath" TEXT,
    "totalTasksCount" INTEGER NOT NULL DEFAULT 0,
    "completedTasksCount" INTEGER NOT NULL DEFAULT 0,
    "progress" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "todoListId" TEXT NOT NULL,
    CONSTRAINT "Task_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "TodoList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
