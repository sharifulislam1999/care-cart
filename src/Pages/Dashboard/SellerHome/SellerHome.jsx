import { useQuery } from '@tanstack/react-query';
import SectionTitle from './../../../Components/SectionTitle/SectionTitle';
import useAuth from './../../../Hooks/useAuth';
import useSecure from './../../../Hooks/useSecure';
import { Helmet } from 'react-helmet';
const SellerHome = () => {
    const {user} = useAuth();
    const useAxiosSecure = useSecure();
    const {data:sellerStack={}}= useQuery({
        queryKey:["sellerStack"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/sellerstack/${user.email}`)
            return res.data;
        }
    })
    console.log(sellerStack)
    return (
        <div>
             <Helmet>
                <title>Seller Home</title>
            </Helmet>
            <SectionTitle title={`Welcome, ${user?.displayName}`}></SectionTitle>
            <div className='flex gap-4 mt-10'>
                <div className='flex-1 text-center py-5 border space-y-3 rounded-lg'>
                    <h1 className='text-2xl font-bold text-[#008080]'>Total Revenue</h1>
                    <h1 className='text-xl font-bold'>{sellerStack.totalSales} TK</h1>
                </div>
                <div className='flex-1 text-center py-5 border space-y-3 rounded-lg'>
                    <h1 className='text-2xl font-bold text-[#008080]'>Total Paid</h1>
                    <h1 className='text-xl font-bold'>{sellerStack.totalPaid} TK</h1>
                </div>
                <div className='flex-1 text-center py-5 border space-y-3 rounded-lg'>
                    <h1 className='text-2xl font-bold text-[#008080]'>Total Unpaid</h1>
                    <h1 className='text-xl font-bold'>{sellerStack.totalUnPaid} TK</h1>
                </div>
            </div>
        </div>
    );
};

export default SellerHome;