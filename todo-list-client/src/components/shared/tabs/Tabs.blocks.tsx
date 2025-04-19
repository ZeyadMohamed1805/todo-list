import { TActiveTabPanel, TTabHeadersProps } from "./Tabs.types";
import styles from "./Tabs.module.scss";
import { useMemo } from "react";

export const TabHeaders = ({ props }: TTabHeadersProps) => {
    return props.tabs.map((tab, index) => {
        return (
            <button
                key={index}
                className={`${styles.tabHeaderButton} ${props.activeTabIndex === index ? styles.active : ""}`}
                onClick={() => props.setActiveTabIndex(index)}
            >
                {tab.title}
            </button>
        )
    }
    );
};

export const ActiveTabPanel = ({ props }: TActiveTabPanel) => {
    const TabPanel = useMemo(() => {
        return props.tabs[props.activeTabIndex].TabPanel;
    }, [props.activeTabIndex, props.tabs]);

    return <TabPanel />;
};