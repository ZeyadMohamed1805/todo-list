export type Task = {
    id: string;
    title: string;
    createdAt: Date;
    isCompleted: boolean;
    order: number;
    todoListId: string;
}