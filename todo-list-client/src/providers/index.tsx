import LayoutProvider from './LayoutProvider';
import { TChildrenProps } from '../types/children';
import RouterProvider from './RouterProvider';
import QueryProvider from './QueryProvider';

const Providers = ({ children }: TChildrenProps) => {
  return (
    <RouterProvider>
      <QueryProvider>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </QueryProvider>
    </RouterProvider>
  );
};

export default Providers;
