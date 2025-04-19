import Description from "../components/auth/description/Description.component";
import Forms from "../components/auth/forms";
import Wrapper from "../components/auth/wrapper";

const Auth = () => {
    return (
        <main>
            <Wrapper>
                <Description />
                <Forms />
            </Wrapper>
        </main>
    );
};

export default Auth;