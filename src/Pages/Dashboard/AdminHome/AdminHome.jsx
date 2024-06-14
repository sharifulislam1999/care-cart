import { useQuery } from '@tanstack/react-query';
import SectionTitle from './../../../Components/SectionTitle/SectionTitle';
import useAuth from './../../../Hooks/useAuth';
import useSecure from './../../../Hooks/useSecure';
const AdminHome = () => {
    const {user} = useAuth();
    const useAxiosSecure = useSecure();
    const {data:adminStack={}}= useQuery({
        queryKey:["adminStack"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/adminstacks`)
            return res.data;
        }
    })
    console.log(adminStack)
    return (
        <div>
            <SectionTitle title={`Welcome, ${user?.displayName}`}></SectionTitle>
            <div className='flex gap-4 mt-10'>
                <div className='flex-1 text-center py-5 border space-y-3 rounded-lg'>
                    <h1 className='text-2xl font-bold text-[#008080]'>Total Revenue</h1>
                    <h1 className='text-xl font-bold'>{adminStack.totalSales} TK</h1>
                </div>
                <div className='flex-1 text-center py-5 border space-y-3 rounded-lg'>
                    <h1 className='text-2xl font-bold text-[#008080]'>Total Paid</h1>
                    <h1 className='text-xl font-bold'>{adminStack.totalPaid} TK</h1>
                </div>
                <div className='flex-1 text-center py-5 border space-y-3 rounded-lg'>
                    <h1 className='text-2xl font-bold text-[#008080]'>Total Unpaid</h1>
                    <h1 className='text-xl font-bold'>{adminStack.totalUnPaid} TK</h1>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;