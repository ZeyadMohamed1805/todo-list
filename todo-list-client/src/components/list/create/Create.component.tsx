import Input from '../../shared/input';
import styles from './Create.module.scss';

const Create = () => {
    return (
        <div className={styles.createTodo}>
            <Input props={{ name: "create-todo", type: "text", placeholder: "New Todo" }} />
            <button type="button" className={styles.addButton}>
                ✚ Add
            </button>
        </div>
    );
};

export default Create;
