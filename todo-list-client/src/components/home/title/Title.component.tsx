import { useTranslation } from 'react-i18next';
import styles from './Title.module.scss';
import { useState } from 'react';
import Modal from '../../shared/modal';
import { VariantsEnum } from '../../../enums/variants';
import NewListForm from '../newListForm';

const Title = () => {
  const { t } = useTranslation();
  const [isNewListModalOpen, setIsNewListModalOpen] = useState<boolean>();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t('home.title')}</h1>
      <p className={styles.description}>{t('home.description')}</p>
      <button type="button" onClick={() => setIsNewListModalOpen(true)} className={styles.button}>
        ✚ {t('home.add_list')}
      </button>
      <Modal
        props={{
          isOpen: isNewListModalOpen,
          onClose: () => setIsNewListModalOpen(false),
          title: t('home.add_list'),
          variant: VariantsEnum.SUCCESS,
        }}
      >
        <NewListForm />
      </Modal>
    </div>
  );
};

export default Title;
