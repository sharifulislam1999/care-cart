import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSecure from "./useSecure";

const useRole = () => {
    const {user,loading} = useAuth();
    const useAxiosSecure = useSecure();
    const {data:role,isPending:rolePending} = useQuery({
        queryKey:[user?.email,"role"],
        enabled: !loading,
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/getrole/${user.email}`);
            console.log(res.data)
            return res.data.role;
        }
    })
    // console.log(role)
    return [role,rolePending];
    // return ""
};

export default useRole;