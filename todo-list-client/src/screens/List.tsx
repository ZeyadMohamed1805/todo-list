import Progress from '../components/list/progress';
import { TODO_PROGRESS_PERCENTAGE } from '../components/list/progress/Progress.constants';
import Title from '../components/list/title';
import { TODO_TITLE_DATA } from '../components/list/title/Title.constants';

const Todo = () => {
  return (
    <main>
      <Progress props={TODO_PROGRESS_PERCENTAGE} />
      <Title props={TODO_TITLE_DATA} />
    </main>
  );
};

export default Todo;
