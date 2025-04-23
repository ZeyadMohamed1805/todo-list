import styles from './Checkbox.module.scss';
import { TCheckboxProps } from './Checkbox.types';

const Checkbox = ({ props }: TCheckboxProps) => {
    return (
        <input
            type="checkbox"
            title={props.title}
            checked={props.isChecked}
            onChange={() => props.setIsChecked((previousIsChecked) => !previousIsChecked)}
            className={styles.checkbox}
        />
    );
};

export default Checkbox;
