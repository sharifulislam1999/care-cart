import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";

const Payment = () => {
//   alert(import.meta.env.VITE_Payment_key);
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_key);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
