import Progress from "../progress";
import Title from "../title";
import Tasks from "../tasks";
import { useGetTodoList } from "./ListContent.hooks";
import UploadIcon from "../uploadIcon";

const ListContent = () => {
    const todoList = useGetTodoList();
    
    if (todoList.isLoading) {
        return <>Loading...</>
    }
    
    return (
        <>
            <Progress props={{ progress: todoList.data.progress }} />
            <Title props={{ imagePath: todoList.data.imagePath, title: todoList.data.title, createdAt: todoList.data.createdAt }} />
            <UploadIcon />
            <Tasks />
        </>
    );
};

export default ListContent;
