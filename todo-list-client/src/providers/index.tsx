import LayoutProvider from "./LayoutProvider";
import { TChildrenProps } from "../types/children";
import RouterProvider from "./RouterProvider";

const Providers = ({ children }: TChildrenProps) => {
    return (
        <RouterProvider>
            <LayoutProvider>
                {children}
            </LayoutProvider>
        </RouterProvider>
    );
};

export default Providers;
