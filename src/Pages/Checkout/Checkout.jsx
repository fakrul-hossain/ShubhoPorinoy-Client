import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/AxiosHooks";
import UseAuth from "../../hooks/UseAuth";

// Load Stripe (Replace with your actual Stripe Publishable Key)
const stripePromise = loadStripe("your-stripe-publishable-key");

const CheckoutForm = ({ biodataId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Call backend API to create payment intent
    try {
      const { data: clientSecret } = await axiosSecure.post("/create-payment-intent", {
        amount: 500, // $5 USD (amount in cents)
      });

      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment Successful!");

          // Save Contact Request to Database
          await axiosSecure.post("/contact-requests", {
            biodataId,
            userEmail: user.email,
            status: "pending", // Admin will approve later
          });

          toast.success("Contact request sent for admin approval.");
        }
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Checkout</h2>

      {/* Read-only Fields */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium">Biodata ID</label>
        <input type="text" value={biodataId} readOnly className="w-full border p-2 rounded bg-gray-100" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 font-medium">Your Email</label>
        <input type="email" value={user?.email} readOnly className="w-full border p-2 rounded bg-gray-100" />
      </div>

      {/* Stripe Card Input */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium">Card Details</label>
        <div className="border p-2 rounded">
          <CardElement />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#FE287A] text-white py-2 rounded-lg mt-3"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay $200"}
      </button>
    </form>
  );
};

const Checkout = () => {
  const location = useLocation();
  const biodataId = location?.state?.biodataId || "N/A"; // Get biodataId from navigation state

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm biodataId={biodataId} />
    </Elements>
  );
};

export default Checkout;
