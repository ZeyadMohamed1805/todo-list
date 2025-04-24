import { TodosStatusEnum } from "../../../enums";

export const TODOS = [
    {
        id: '1',
        title: 'Finish React project',
        completed: false,
        status: TodosStatusEnum.IN_PROGRESS,
    },
    {
        id: '2',
        title: 'Grocery shopping',
        completed: false,
        status: TodosStatusEnum.PENDING,
    },
    {
        id: '3',
        title: 'Read a book',
        completed: true,
        status: TodosStatusEnum.COMPLETED,
    },
]
