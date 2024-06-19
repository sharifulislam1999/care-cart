import { useQuery } from '@tanstack/react-query';
import SectionTitle from './../../../Components/SectionTitle/SectionTitle';
import useSecure from '../../../Hooks/useSecure';
import { Helmet } from 'react-helmet';
const PaymentManagement = () => {
    const useAxiosSecure = useSecure();
    const {data:payments = [],refetch}= useQuery({
        queryKey: ["payments"],
        queryFn: async ()=>{
            const res = await useAxiosSecure.get('/adminpayments')
            const transId =  res.data.map(item => item.transId)
            const transIdUnique = new Set(transId)
            const transArray = Array.from(transIdUnique)
            const main = [];
            for(let i = 0; i < transArray.length; i++){
                for(let j = 0; j < res.data.length; j++){
                    let price = 0;
                    if(transArray[i] === res.data[j].transId){
                        price += parseInt(res.data[j].price);
                        main.push({
                            id:transArray[i],
                            price: price,
                            status: res.data[j].status                 
                        })
                    }
                }
            }            
            const mergeAndSum = (items) => {
                const mergedItems = items.reduce((acc, item) => {
                  if (!acc[item.id]) {
                    acc[item.id] = { id: item.id, price: 0, status: 'paid' };
                  }
                  acc[item.id].price += item.price;
                  if (item.status === 'pending') {
                    acc[item.id].status = 'pending';
                  }
                  return acc;
                }, {});
              
                return Object.values(mergedItems);
              };
              const result = mergeAndSum(main);
              console.log(result)
              return result;
        }
    });



    const handlePaid = (id)=>{
        // console.log(id)
        useAxiosSecure.patch(`/payments/${id}`,{status:'paid'})
        .then(res=>{
            if(res.data.modifiedCount > 0){
                refetch();
            }         
         });
    }
    return (
        <div>
            <Helmet>
                <title>Payment Management</title>
            </Helmet>
            <SectionTitle title={'All Payments'} />
            <div className='overflow-x-auto overflow-y-auto h-[80vh]'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Serial</th>                           
                            <th>TransectionID</th>
                            <th>TK</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((item,i)=><tr key={i}>
                            <td>{i+1}</td>                            
                            <td>{item.id}</td>                            
                            <td>{item.price}</td>                            
                            <td>{
                                
                                item.status === "paid" ? <span className='text-green-600 font-bold'>{item.status}</span>:<span className='text-red-600 font-bold'>{item.status}</span>
                                
                                
                                
                                }</td>                            
                            <td>{item.status === "pending" ? <button className='btn btn-sm bg-[#008080] text-white' onClick={()=>handlePaid(item.id)} >Accept Payment</button> : <button className='btn btn-sm bg-[#008080] text-white' disabled>Accept Payment</button>}</td>                            
                            </tr> )}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentManagement;