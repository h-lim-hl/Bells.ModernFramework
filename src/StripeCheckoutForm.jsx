import React, { useState, useEffect } from 'react';
import { useStripe, useElements, Elements, PaymentElement } from '@stripe/react-stripe-js';
import { useLocation } from 'wouter'; // Wouter's useNavigate hook
import { useCart } from "./StoreCart";

// Prop requirements :
// string currency = "USD"
// number amount
// bool inCents = false
// successRedirect
// errorRedirect

const StripeCheckoutForm = (prop) => {
  const stripe = useStripe();
  const elements = useElements();

  const [, setLocation] = useLocation();
  const { fetchCart, getCartTotal } = useCart();

  const [isLoading, setIsLoading] = useState(false);

  if (prop.inCents) prop.amount = Math.floor(prop.amount * 10.0);

  useEffect(() => {
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: prop.successRedirect,
      },
    });

    if (result.error) {
      console.error(result.error.message);
      showMessage(result.error.message, "danger")
      setLocation(prop.errorsRedirect);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion"
  }

  return (

      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={isLoading || !stripe || !elements}>
          {`Pay ${prop.currency} ${getCartTotal().toFixed(2)}`}
        </button>
      </form>

  );
};

export default StripeCheckoutForm;