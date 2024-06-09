import { useContext } from 'react';
import { MyContext } from '../AuthProvider/AuthProvder';

const useAuth = () => {
    const MyAuth = useContext(MyContext)
    return MyAuth;
};

export default useAuth;