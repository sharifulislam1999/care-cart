import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useSecure from "../../../Hooks/useSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const UserPayments = () => {
    const {user} = useAuth();
    const useAxiosSecure = useSecure();
    const {data:userPayment=[]} = useQuery({
        queryKey:["userpayment"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get(`/userpayment/${user.email}`);
            return res.data;
        }
    })
    return (
        <div className=" overflow-auto max-h-[80vh]">
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
                {userPayment.map((item,i) => <tr key={i}>
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

export default UserPayments;