import Description from "../components/auth/description/Description.component";
import Forms from "../components/auth/forms";
import Preferences from "../components/auth/preferences";
import Wrapper from "../components/auth/wrapper";

const Auth = () => {
    return (
        <main>
            <Wrapper>
                <Preferences />
                <Description />
                <Forms />
            </Wrapper>
        </main>
    );
};

export default Auth;