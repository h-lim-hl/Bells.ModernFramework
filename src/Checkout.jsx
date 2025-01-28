import React, { useEffect, useState } from "react";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE); // Replace with your Stripe public key


import { useCart } from "./StoreCart";
import { useJwt } from "./UserStore";


import StripeCheckoutForm from "./StripeCheckoutForm";

const Checkout = () => {
  const { fetchCart, getCart, getCartTotal } = useCart();
  const [csrfToken, setCsrfToken] = useState("");
  const [stripeClientSecret, setStripeClientSecret] = useState(null);

  const cart = getCart();
  const { getJwt } = useJwt();
  const jwt = getJwt();

  const stripeApperance = {
    "theme": "stripe"
  };
  const stripeLoader = "auto";

  useEffect(() => {
    //get csrf token
    // axios.get(
    //   `${import.meta.env.VITE_API_URL}/api/csrf`, {withCredentials: true}
    // ).then ((res) =>{
    //   setCsrfToken(res.data.csrfToken);
    // }).catch((err) => {
    //   console.error(`Error fetching CSRF token: ${err}`);
    // });

    fetchCart();
    // signal paymentIntent to be created and capture ClientSecret key from server. 
    const getClientSecret = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/checkout/paymentIntent`, {},
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setStripeClientSecret(res.data.client_secret);
        console.log(`print res `, res.data.client_secret);
        console.log("stripeClientSecret ", stripeClientSecret);
      } catch (err) {
        console.error("Error getting paymentIntent: ", err.message);
      }
    };

    getClientSecret();

  }, []);

  //setStripeClientSecret("something");
  return (<>
    <div className="container mt-4">
      <h1>Checkout</h1>
      {cart.length === 0 ? (<p>Your Cart is empty </p>) : (<>
        <ul className="list-group">
          {
            cart.map((item) => (
              <li key={item.id}
                className="list-group-item d-flex justify-content-between align-item-center">
                <div>
                  <img src={item.imageUrl} alt={item.productName} className="cart-image" />
                  <h5>{item.productName}</h5>
                  <p className="mb-0">Quantity: {item.quantity}</p>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))
          }
        </ul>
      </>)
      }
      <div className="mt-3 text-end">
        <h4>Total: ${getCartTotal().toFixed(2)}</h4>
      </div>
      {stripeClientSecret && (<Elements options={{
        "clientSecret": stripeClientSecret,
        "apperance": stripeApperance,
        "loader": stripeLoader
      }}
        stripe={stripePromise}>
        <StripeCheckoutForm
          amount={getCartTotal().toFixed(2)}
          inCents={false}
          currency="SGD"
          successRedirect={import.meta.env.VITE_HOME_URL}
        />
      </Elements>
      )}
    </div>
  </>);
}

export default Checkout;