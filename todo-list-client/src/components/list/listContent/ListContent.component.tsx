import Progress from "../progress";
import Title from "../title";
import Todos from "../todos";
import { useGetTodoList } from "./ListContent.hooks";

const ListContent = () => {
    const todoList = useGetTodoList();
    
    if (todoList.isLoading) {
        return <>Loading...</>
    }
    
    return (
        <>
            <Progress props={{ progress: todoList.data.progress }} />
            <Title props={{ title: todoList.data.title }} />
            <Todos props={{ todos: todoList.data.tasks }} />
        </>
    );
};

export default ListContent;
