
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProviders';
const SocialLogin = () => {

    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedInUser = result.user;
                // console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
                fetch('https://ass-12-server-slsuyel.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
    }



    return (
        <div className='text-center w-75'>
            <Button onClick={handleGoogleLogin} variant="secondary">
                <FaGoogle />
            </Button>
        </div>
    );
};

export default SocialLogin;