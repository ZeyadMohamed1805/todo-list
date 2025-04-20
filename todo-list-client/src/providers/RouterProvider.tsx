import { BrowserRouter } from "react-router-dom";
import { TChildrenProps } from "../types/children";

const RouterProvider = ({ children }: TChildrenProps) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
};

export default RouterProvider;
