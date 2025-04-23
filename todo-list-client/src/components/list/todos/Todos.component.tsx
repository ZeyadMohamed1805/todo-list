import { Todo } from './Todos.blocks';
import { TODOS } from './Todos.constants';
import { useKeyBindTodoList } from './Todos.hooks';

const Todos = () => {
    const keyBindTodoListData = useKeyBindTodoList();

    return TODOS.map((todo, index) => (
        <Todo
            key={todo.id}
            props={{
                todo,
                todoRef: (element) => {
                    if (element) keyBindTodoListData.todoRefs.current[index] = element;
                }
            }}
        />
    ))
}

export default Todos;
