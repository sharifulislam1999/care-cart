import useAuth from '../../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useRole from './../../Hooks/useRole';

const AdminRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const [role,rolePending] = useRole();
    const location = useLocation();
    if(loading || rolePending){
        return <div className='flex justify-center py-20'>
            <progress className='progress w-56'></progress>
        </div>
    }
    if(user && (role === "admin")){
        return children
    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default AdminRoutes;