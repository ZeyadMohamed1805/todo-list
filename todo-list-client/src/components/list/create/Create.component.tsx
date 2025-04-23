import { useTranslation } from 'react-i18next';
import Input from '../../shared/input';
import styles from './Create.module.scss';

const Create = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.createTodo}>
            <Input props={{ name: "create-todo", type: "text", placeholder: t("todo.new_todo") }} />
            <button type="button" className={styles.addButton}>
                ✚ {t('add')}
            </button>
        </div>
    );
};

export default Create;
