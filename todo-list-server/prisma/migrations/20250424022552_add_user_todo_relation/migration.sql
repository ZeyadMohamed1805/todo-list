/*
  Warnings:

  - Added the required column `userId` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imagePath" TEXT,
    "totalTasksCount" INTEGER NOT NULL DEFAULT 0,
    "completedTasksCount" INTEGER NOT NULL DEFAULT 0,
    "progress" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "TodoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TodoList" ("completedTasksCount", "createdAt", "id", "imagePath", "progress", "title", "totalTasksCount") SELECT "completedTasksCount", "createdAt", "id", "imagePath", "progress", "title", "totalTasksCount" FROM "TodoList";
DROP TABLE "TodoList";
ALTER TABLE "new_TodoList" RENAME TO "TodoList";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
