import Header from '../components/shared/header';
import Toast from '../components/shared/toast';
import { TChildrenProps } from '../types/children';

const LayoutProvider = ({ children }: TChildrenProps) => {
  return (
    <>
      <Header />
      {children}
      <Toast />
    </>
  );
};

export default LayoutProvider;
