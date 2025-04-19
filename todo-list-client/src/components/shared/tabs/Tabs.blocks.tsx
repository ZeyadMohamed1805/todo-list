import { TActiveTabPanel, TTabHeadersProps } from './Tabs.types';
import styles from './Tabs.module.scss';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const TabHeaders = ({ props }: TTabHeadersProps) => {
  const { t } = useTranslation();

  return props.tabs.map((tab, index) => {
    return (
      <button
        type="button"
        key={index}
        className={`${styles.tabHeaderButton} ${props.activeTabIndex === index ? styles.active : ''}`}
        onClick={() => props.setActiveTabIndex(index)}
      >
        {t(tab.title)}
      </button>
    );
  });
};

export const ActiveTabPanel = ({ props }: TActiveTabPanel) => {
  const TabPanel = useMemo(() => {
    return props.tabs[props.activeTabIndex].TabPanel;
  }, [props.activeTabIndex, props.tabs]);

  return <TabPanel />;
};
