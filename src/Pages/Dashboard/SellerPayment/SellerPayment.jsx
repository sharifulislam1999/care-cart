import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useSecure from "../../../Hooks/useSecure";
import SectionTitle from './../../../Components/SectionTitle/SectionTitle';

const SellerPayment = () => {
    const {user,loading} = useAuth();
    // console.log(!loading)
    const useAxiosSecure = useSecure();
    const {data: sellerpayment = []} = useQuery({
        queryKey:['sellerpayment',user?.email],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/sellerpayment/${user?.email}`);
            return res.data;
        }
    }) 
    console.log(sellerpayment);
    return (
        <div>
            <SectionTitle title="Payment History"></SectionTitle>
            <table className="table">
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Price</th>
                        <th>Transaction Id</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sellerpayment.map((item,i) => <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.price} TK</td>
                        <td>{item.transId}</td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td>{item.status}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default SellerPayment;