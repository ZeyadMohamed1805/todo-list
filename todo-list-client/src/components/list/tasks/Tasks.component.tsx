import { Todo } from './Tasks.blocks';
import { useGetTasksByTodoListId, useKeyBindTodoList } from './Tasks.hooks';
import { TTask } from './Tasks.types';

const Tasks = () => {
    const keyBindTodoListData = useKeyBindTodoList();
    const tasksRequest = useGetTasksByTodoListId();

    if (tasksRequest.isLoading) {
        return <>Loading...</>;
    }

    return tasksRequest.data.map((task: TTask, index: number) => (
        <Todo
            key={task.id}
            props={{
                task,
                taskRef: (element) => {
                    if (element) keyBindTodoListData.taskRefs.current[index] = element;
                }
            }}
        />
    ))
}

export default Tasks;
