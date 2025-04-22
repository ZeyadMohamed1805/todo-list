import Progress from "../components/todo/progress";
import { TODO_PROGRESS_PERCENTAGE } from "../components/todo/progress/Progress.constants";
import Title from "../components/todo/title";
import { TODO_TITLE_DATA } from "../components/todo/title/Title.constants";

const Todo = () => {
  return (
    <main>
      <Progress props={TODO_PROGRESS_PERCENTAGE} />
      <Title props={TODO_TITLE_DATA} />
    </main>
  );
};

export default Todo;
