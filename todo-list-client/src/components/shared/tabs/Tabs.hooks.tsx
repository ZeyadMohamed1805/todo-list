import { useState } from "react";

export const useActiveTab = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return { activeTabIndex, setActiveTabIndex };
};