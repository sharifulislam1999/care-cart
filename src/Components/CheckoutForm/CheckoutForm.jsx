import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import usePublic from "../../Hooks/usePublic";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error,setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth()
  const navigate = useNavigate();
  const axiosPublic = usePublic();
  const [clientSec,setClientSec] = useState('')
  const [cart, refetch] = useCart();
  const total = cart.reduce((a, i) => parseInt(i.price) + a, 4);
// const total = 45;
  useEffect(()=>{
    if(total > 0){
        axiosPublic.post('/makepayment',{price:total})
        .then(res=>{
            console.log(res.data.clientSecret)
            setClientSec(res.data.clientSecret)
        })       
    }
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message)
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("")
    }
    const {paymentIntent,error:confirmError} = await stripe.confirmCardPayment(clientSec,{
        payment_method:{
            card: card,
            billing_details:{
                email: user?.email || 'anonymous',
                name: user?.displayName || "anonymous"
            }
        }

    })
    if(confirmError){
        console.log("confirm error")
    }else{
        console.log("payment intent",paymentIntent)
        if(paymentIntent.status === "succeeded"){

            alert('payment success')

            
            const payment = {
                email: user.email,
                price: total,
                transId:paymentIntent.id,
                date: new Date(),
                cartId: cart.map(item => item._id),
                menuId: cart.map(item => item.menuId),
                status: 'pending'
            }
            const res = await axiosPublic.post('/savepayment',payment)
            console.log(res.data)
            if(res.data.clearCart.deletedCount){
                refetch();
                navigate('/')
            }
        }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
    <p className="text-red-600 mt-4">{error}</p>
      <button
        className="bg-[#008080] rounded-md mt-2 hover:bg-[#008080df] py-2 px-5 font-bold text-white"
        type="submit"
        disabled={!stripe || !clientSec || !total}
      >
        Confirm Payment
      </button>
    </form>
  );
};

export default CheckoutForm;
