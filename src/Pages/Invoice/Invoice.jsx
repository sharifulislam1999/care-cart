import { useParams } from "react-router-dom";
import useSecure from "../../Hooks/useSecure";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import useAuth from "../../Hooks/useAuth";

const Invoice = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const useAxiosSecure = useSecure();
  const [invoice, setInvoice] = useState([]);
  useEffect(() => {
    useAxiosSecure.get(`/invoice/${id}`).then((res) => {
      setInvoice(res.data.makeInvoice);
      console.log(res.data);
    });
  }, []);
  const totalPrice = invoice.reduce((a,i)=> a + parseInt(i.price),0)
  console.log(totalPrice);
  return (
    <div className="container mx-auto px-3">
      <div className="mt-20 print:hidden">
        <button onClick={()=>print()} className="btn bg-[#008080] text-white btn-sm">Print</button>
      </div>
      <div className="mt-2 border p-6">
        <div className="flex justify-between">
          <div>
            <img className="w-32" src={logo} alt="" />
          </div>
          <div>
            <h1>Invoice No: #{id}</h1>
          </div>
        </div>
        <div className="mt-2">
          <h1 className="text-lg">Customer Information</h1>
          <h1 className="text-sm">Name: {user.displayName}</h1>
        </div>
        <div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {invoice.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i +1}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="font-bold">Total:{totalPrice} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
