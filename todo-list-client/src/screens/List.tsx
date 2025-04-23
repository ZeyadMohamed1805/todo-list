import Progress from '../components/list/progress';
import Title from '../components/list/title';
import Todos from '../components/list/todos';
import { TODO_PROGRESS_PERCENTAGE } from '../components/list/progress/Progress.constants';
import { TODO_TITLE_DATA } from '../components/list/title/Title.constants';
import Create from '../components/list/create';

const List = () => {
  return (
    <main>
      <Progress props={TODO_PROGRESS_PERCENTAGE} />
      <Title props={TODO_TITLE_DATA} />
      <Todos />
      <Create />
    </main>
  );
};

export default List;
