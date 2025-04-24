
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TChildrenProps } from '../types/children';

const queryClient = new QueryClient();

const QueryProvider = ({ children }: TChildrenProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;
