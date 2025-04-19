import { Dispatch, JSX, SetStateAction } from "react";

export type TTab = {
    title: string;
    TabPanel: () => JSX.Element;
};

export type TTabsProps = {
    props: {
        tabs: Array<TTab>;
    };
};

export type TTabHeadersProps = {
    props: {
        tabs: Array<TTab>;
        activeTabIndex: number;
        setActiveTabIndex: Dispatch<SetStateAction<number>>;
    };
};

export type TActiveTabPanel = {
    props: {
        tabs: Array<TTab>;
        activeTabIndex: number;
    };
};