import Header from '../components/shared/header';
import Loading from '../components/shared/loading';
import Toast from '../components/shared/toast';
import { TChildrenProps } from '../types/children';

const LayoutProvider = ({ children }: TChildrenProps) => {
  return (
    <>
      <Header />
      <Loading />
      {children}
      <Toast />
    </>
  );
};

export default LayoutProvider;
