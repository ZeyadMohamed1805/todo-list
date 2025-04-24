import Progress from "../progress";
import Title from "../title";
import Tasks from "../tasks";
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
            <Tasks />
        </>
    );
};

export default ListContent;
