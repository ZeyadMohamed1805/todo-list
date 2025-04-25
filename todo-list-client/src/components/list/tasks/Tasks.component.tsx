import { Task } from './Tasks.blocks';
import { useDragAndDropTaskRows, useGetTasksByTodoListId, useKeyBindTodoList } from './Tasks.hooks';
import { TTask } from './Tasks.types';

const Tasks = () => {
    const keyBindTodoListData = useKeyBindTodoList();
    const tasksRequest = useGetTasksByTodoListId();
    const dragAndDropTaskRowsData = useDragAndDropTaskRows({ props: { tasks: tasksRequest.data } });
    
    if (tasksRequest.isLoading) {
        return <>Loading...</>;
    }
    
    return dragAndDropTaskRowsData.tasks?.map((task: TTask, index: number) => (
        <Task
            key={task.id}
            props={{
                task,
                taskRef: (element) => {
                    if (element) keyBindTodoListData.taskRefs.current[index] = element;
                },
                ...dragAndDropTaskRowsData
            }}
        />
    ))
}

export default Tasks;
