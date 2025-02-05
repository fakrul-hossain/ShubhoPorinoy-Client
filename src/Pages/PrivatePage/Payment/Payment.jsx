import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";
import CheckOutForm from "../CheckoutForm";

// Add publisable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_API_KEY);
const Payment = () => {
  const { id } = useParams();
  return (
    <div>
        <div>
            <h1>For premium mamber 200usd</h1>
        </div>
      <Elements stripe={stripePromise}>
        <CheckOutForm id={id}></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
