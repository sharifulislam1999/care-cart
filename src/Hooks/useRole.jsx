import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSecure from "./useSecure";

const useRole = () => {
  //   const {user,loading} = useAuth();
  //   const useAxiosSecure = useSecure();
  // if(!loading){
  //   useAxiosSecure.get(`/getrole/${user.email}`)
  //   .then(res=>{
  //       return res.data.role;
  //   })
  // }
  //   // return "admin"
  //   // const {data:role,isPending:rolePending} = useQuery({
  //   //     queryKey:[user?.email,"role"],
  //   //     enabled: !loading,
  //   //     queryFn: async ()=>{
  //   //         const res = await useAxiosSecure.get(`/getrole/${user.email}`);
  //   //         return res.data.role;
  //   //     }
  //   // })
  //   // return [role,rolePending];
  //   // // return ""
  return "admin";
};

export default useRole;