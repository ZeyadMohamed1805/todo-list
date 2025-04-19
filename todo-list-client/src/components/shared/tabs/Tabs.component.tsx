import styles from "./Tabs.module.scss";
import { TTabsProps } from "./Tabs.types";
import { useActiveTab } from "./Tabs.hooks";
import { ActiveTabPanel, TabHeaders } from "./Tabs.blocks";

const Tabs = ({ props }: TTabsProps) => {
    const { activeTabIndex, setActiveTabIndex } = useActiveTab();

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabHeaders}>
                <TabHeaders
                    props={{
                        tabs: props.tabs,
                        activeTabIndex,
                        setActiveTabIndex,
                    }}
                />
            </div>

            <div className={styles.tabContent}>
                <ActiveTabPanel props={{ tabs: props.tabs, activeTabIndex }} />
            </div>
        </div>
    );
};

export default Tabs;