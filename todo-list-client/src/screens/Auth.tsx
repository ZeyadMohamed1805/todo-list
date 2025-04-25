import Description from '../components/auth/description/Description.component';
import Forms from '../components/auth/forms';
import Preferences from '../components/auth/preferences';

const Auth = () => {
  return (
    <main id='auth-screen'>
        <Preferences />
        <Description />
        <Forms />
    </main>
  );
};

export default Auth;
