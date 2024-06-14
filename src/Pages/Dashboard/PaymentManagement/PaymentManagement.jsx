import { useQuery } from '@tanstack/react-query';
import SectionTitle from './../../../Components/SectionTitle/SectionTitle';
import useSecure from '../../../Hooks/useSecure';
const PaymentManagement = () => {
    const useAxiosSecure = useSecure();
    const {data:payments = [],refetch}= useQuery({
        queryKey: ["payments"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get('/payments')
            return res.data;
        }
    });
    const handlePaid = (id)=>{
        console.log(id)
        useAxiosSecure.patch(`/payments/${id}`,{status:'paid'})
        .then(res=>{
            console.log(res.data)

        })
    }
    return (
        <div>
            <SectionTitle title={'All Payments'} />
            <div className='overflow-x-auto'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Email</th>
                            <th>Tk</th>
                            <th>TransectionID</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((item,i)=><tr key={i}>
                            <td>{i+1}</td>                            
                            <td>{item.user}</td>                            
                            <td>{item.price}</td>                            
                            <td>{item.transId}</td>                            
                            <td>
                            {item.status === "pending"  ? <span className='text-red-600'>{item.status}</span>:<span className='text-green-600'>{item.status}</span>}
                                </td>                            
                            <td><button className='btn btn-sm bg-[#008080] text-white' onClick={()=>handlePaid(item._id)}>Accept Payment</button></td>                            
                            </tr> )}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentManagement;