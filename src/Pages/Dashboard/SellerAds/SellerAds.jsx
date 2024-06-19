import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useSecure from "../../../Hooks/useSecure";
import { Helmet } from "react-helmet";
// http://localhost:5000/sellerbanner/bangla@mail.com
const SellerAds = () => {
    const {user} = useAuth();
    const useAxiosSecure = useSecure()
    const {data:myrequest=[]} = useQuery({
        queryKey:["myrequest"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/sellerbanner/${user?.email}`);
            return res.data;
        }
    });
    return (
        <div>
             <Helmet>
                <title>Ads Request</title>
            </Helmet>
            <SectionTitle title="My Ads Request"></SectionTitle>
            <div className="max-h-[80vh] overflow-y-auto">
            <table className="table w-full border mt-10">
                   <thead>
                    <tr className="text-sm">
                            <th className=" w-7 text-center">Serial</th>                         
                            <th className="border text-center">Medicine Name</th>
                            <th className="border text-center">Image</th>
                            <th className="border text-center">Status</th>
                        </tr>
                   </thead>
                   <tbody>
                    {myrequest.map((item,i)=> <tr key={i}>
                        <td className="border">{i+1}</td>
                        <td className="border">{item.medicineName}</td>
                        <td className="border"><img src={item.medicineImage} className="h-10 w-10 rounded-md" alt="" /></td>                       
                        <td className="border">{item.status}</td>                       
                        {/* <td className="border"><button className="bg-[#008080] text-center w-full py-2 rounded-md cursor-pointer text-white font-bold" onClick={()=>handleView(item)}>View</button></td> */}
                    </tr>)}
                    
                   </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerAds;