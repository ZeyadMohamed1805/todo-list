import Progress from "../progress";
import Title from "../title";
import Tasks from "../tasks";
import { useGetTodoList, useUploadIcon } from "./ListContent.hooks";
import UploadIcon from "../uploadIcon";

const ListContent = () => {
    const uploadIconData = useUploadIcon();
    const todoList = useGetTodoList();
    
    if (todoList.isLoading) {
        return <>Loading...</>
    }
    
    return (
        <>
            <Progress props={{ progress: todoList.data.progress }} />
            <Title props={{ icon: uploadIconData.uploadedIcon, title: todoList.data.title, createdAt: todoList.data.createdAt }} />
            <UploadIcon props={{ ...uploadIconData }} />
            <Tasks />
        </>
    );
};

export default ListContent;
