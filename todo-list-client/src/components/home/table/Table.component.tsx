import styles from './Table.module.scss';
import { TableContent, TableHeaders } from './Table.blocks';

const Table = () => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <TableHeaders />
          </tr>
        </thead>
        <tbody>
          <TableContent />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
