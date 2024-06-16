import Loginform from './../../Components/Loginform/Loginform';
import { Helmet } from 'react-helmet';
const Login = () => {
    return (

        <div className='container mx-auto px-3 mt-10'>
             <Helmet>
                <title>Home || Login</title>
            </Helmet>
            <Loginform/>
        </div>
    );
};

export default Login;