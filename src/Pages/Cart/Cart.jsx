import Banner from "../../Components/Banner/Banner";
import useCart from "../../Hooks/useCart";
import Payment from "../Payment/Payment";
import useSecure from "../../Hooks/useSecure";
const Cart = () => {
  const [cart, refetch] = useCart();
  const total = cart.reduce((a, i) => parseInt(i.price * i.quantity) + a, 0);
  const useAxiosSecure = useSecure();
  const deleteCart = (id)=>{
    useAxiosSecure.delete(`/cart/${id}`)
    .then(res =>{
      if(res.data.deletedCount >0){
        refetch();
      }
    })    
  }
  const handleQuantity = (dependency,id,qtn)=>{
    if(dependency === "d"){
      if(qtn === 1){
        return;
      }
    }    
    useAxiosSecure.patch(`/cart?dep=${dependency}&id=${id}`)
    .then(res=>{
      if(res.data.matchedCount > 0){
        refetch()
      }
    })
  }
  return (
    <div>
      <Banner title={`My Cart (${cart.length})`}></Banner>
      <div className="container mx-auto px-3 mt-10">
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Medicine Image</th>
                <th>Medicine Name</th>
                <th>Company</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><img className="h-10 w-10" src={item.image} alt="" /></td>
                  <td>Name</td>
                  <td>company</td>
                  <td>{item.price} x {item.quantity} = {item.price * item.quantity}</td>
                  <td className="flex gap-2"> <div className="cursor-pointer" onClick={()=>handleQuantity("i",item._id,item.quantity)}>+</div> {item.quantity} <div onClick={()=>handleQuantity("d",item._id,item.quantity)} className="cursor-pointer">-</div></td>
                  <td>
                    <button onClick={()=>deleteCart(item._id)} className="btn btn-sm bg-red-600 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-10 space-y-2 mb-4">
            <div className="flex gap-3 items-center">
              <h1 className="text-2xl font-semibold text-[#008080]">Total:</h1>
              <h1 className="text-2xl font-semibold text-[#008080]">{total}</h1>
            </div>
          </div>
        </div>
        <div>
          <div className="w-[500px] mb-3">
          <Payment></Payment>
          </div>
          <div>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
