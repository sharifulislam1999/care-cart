import { useQuery } from '@tanstack/react-query';
import useSecure from '../../../Hooks/useSecure';
import useAuth from '../../../Hooks/useAuth';
import { Helmet } from 'react-helmet';
const UserHome = () => {
    const {user} = useAuth();
    const useAxiosSecure = useSecure();
    const {data:userPayment=[]} = useQuery({
        queryKey:["categories"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/userpayment/${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
             <Helmet>
                <title>User Home</title>
            </Helmet>
            <h1 className='text-2xl '>Welcome, <span className='text-[#008080] font-semibold'>{user.displayName}</span></h1>
        </div>
    );
};

export default UserHome;