import useSecure from "./useSecure";

const useTanStack = (url) => {
    const useAxiosSecure = useSecure();
    const {data:myData = []} = useQuery({
        queryKey:[user?.email,"role"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`${url}`);
            console.log(res.data)
            return res.data;
        }
    })
    return [role,rolePending];
    // return ""
};



};

export default useTanStack;