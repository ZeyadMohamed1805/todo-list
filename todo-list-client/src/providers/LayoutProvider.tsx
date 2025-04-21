import Header from '../components/shared/header';
import { TChildrenProps } from '../types/children';

const LayoutProvider = ({ children }: TChildrenProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default LayoutProvider;
