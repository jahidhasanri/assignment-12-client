import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckOutForm from "./CheckOutForm";
import { Elements } from '@stripe/react-stripe-js';

const stripPromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  return (
    <div className="mt-20">
      <section heading="payment">
        <div>
          <Elements stripe={stripPromise}>
            <CheckOutForm></CheckOutForm>
          </Elements>
        </div>
      </section>
    </div>
  );
};

export default Payment;
