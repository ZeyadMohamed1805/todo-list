export type TodoList = {
    id: string;
    createdAt: Date;
    userId: number;
    title: string;
    imagePath: string | null;
    totalTasksCount: number;
    completedTasksCount: number;
    progress: number;
}