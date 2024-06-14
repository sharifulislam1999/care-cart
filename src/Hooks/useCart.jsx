import useAuth from './useAuth';
import useSecure from './useSecure';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const {user,loading} = useAuth();
    // console.log(!loading)
    const useAxiosSecure = useSecure();
    const {data: cart = [],refetch,isPending:cartPending} = useQuery({
        queryKey:['cart',user?.email],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/cart?email=${user?.email}`)
            return res.data;
        }
    })
    return [cart,refetch,cartPending]
};

export default useCart;