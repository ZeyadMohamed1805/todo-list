import Progress from "../components/todo/progress";
import { PERCENTAGE } from "../components/todo/progress/Progress.constants";

const Todo = () => {
  return (
    <main>
      <Progress props={{ percentage: PERCENTAGE }} />
    </main>
  );
};

export default Todo;
