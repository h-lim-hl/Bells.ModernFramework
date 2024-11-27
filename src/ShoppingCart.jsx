import React, { useEffect, useRef, useState } from "react";
import { useCart } from "./StoreCart";
import { useJwt } from "./UserStore";
import axios from "axios";


const ShoppingCart = () => {
  const { getCart,
    getCartTotal,
    modifyCart,
    deleteCartItem,
    fetchCart,
    isLoading,
  } = useCart();

  const cart = getCart();
  // console.log("cart: ", cart);

  const { getJwt } = useJwt();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    // const jwt = getJwt();
    // try {
    //     const response = await axios.post(
    //         `${import.meta.env.VITE_API_URL}/api/checkout`,
    //         {},
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${jwt}`,
    //             },
    //         }
    //     );
    //     // Redirect to Stripe Checkout
    //     window.location.href = response.data.url;
    // } catch (error) {
    //     console.error("Error during checkout:", error);
    //     alert("Checkout failed. Please try again.");
    // } finally {
       
    // }
};

  return (<>
    <div className="container mt-4">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (<p>Your Cart is empty </p>) : (<>
        <ul className="list-group">
          {
            cart.map((item) => (
              <li key={item.id}
                className="list-group-item d-flex justify-content-between align-item-center">
                <div>
                  <img src={item.imageUrl} alt={item.productName} className="cart-image" />
                  <h5>{item.productName}</h5>
                  <div className="d-flex align-items-center mt-2">
                    <input type="button"
                      className="btn btn-sm btn-secondary me-2"
                      value="-"
                      onClick={() => {
                        modifyCart(item.product_id, item.quantity - 1)
                      }}
                      disabled={isLoading}
                    />
                    <p className="mb-0">Quantity: {item.quantity}</p>
                    <input type="button"
                      className="btn btn-sm btn-secondary ms-2"
                      value="+"
                      onClick={() => {
                        modifyCart(item.product_id, item.quantity + 1)
                      }}
                      disabled={isLoading}
                    />
                    <button className="btn btn-sm btn-danger ms-2"
                      onClick={() => {
                        deleteCartItem(item.product_id)
                      }}
                      disabled={isLoading}
                    >Remove</button>
                  </div>
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
        <button
          className="btn btn-primary mt-2"
          onClick={handleCheckout}
          disabled={true}
        >
          {isLoading ? "Processing..." : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  </>)
}

export default ShoppingCart;