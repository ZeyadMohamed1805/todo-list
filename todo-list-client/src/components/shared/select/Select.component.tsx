import { Options } from './Select.blocks';
import styles from './Select.module.scss';
import {TSelectProps } from './Select.types';

const Select = ({ props }: TSelectProps) => {
    return (
        <select
            title="status"
            value={props.selectedOption}
            onChange={(event) => props.setSelectedOption(event.target.value)}
            className={styles.select}
        >
            <Options props={props} />
        </select>
    )
};

export default Select;
