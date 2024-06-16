import useAuth from './useAuth';
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const {user} = useAuth();
    const useAxiosSecure = useSecure();
    const {data: cart = [],refetch} = useQuery({
        queryKey:['cart',user?.email],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/cart?email=${user?.email}`)
            return res.data;
        }
    })
    return [cart,refetch]
};

export default useCart;